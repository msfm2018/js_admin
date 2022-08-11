%% coding: utf-8
-module(api_news_splide).

-compile(export_all).


init(Req, Opts) ->
  {cowboy_rest, Req, Opts}.

allowed_methods(Req, State) ->
  {[<<"POST">>], Req, State}.

content_types_accepted(Req, State) ->
  Handlers =
    [{<<"application/x-www-form-urlencoded">>, json_post}, %%web æ¥å£
      {<<"application/json">>, json_post},
      {<<"application/json;charset=utf-8">>, json_post}],                  %%api æ¥å£
  {Handlers, Req, State}.

json_post(Req, State) ->

  %% post解析
  {ok, A, _} = cowboy_req:read_body(Req),
  Map = jsx:decode(A, [return_maps]),

  Result =
    try
      Sql3 =
          "select newid as id,img,title,news.dt from slidepage ,news where slidepage.newid=news.id",

      io:format("~p~n", [Sql3]),

      try
        {ok, FieldList, DataList} = mysql_poolboy:query(pool1, Sql3),
        V = case DataList of
              [] ->
                jsx:encode([{<<"code">>, -1}, {<<"msg">>, <<"no data"/utf8>>}, {<<"data">>, []}]);
              _ ->
                [lists:zip(FieldList, D_DATA) || D_DATA <- DataList]
            end,
        jsx:encode([{<<"code">>, 0}, {<<"msg">>, <<"succ"/utf8>>}, {<<"data">>, V}])
      catch
        _:_ ->
          jsx:encode([{<<"code">>, 1}, {<<"msg">>, <<"error"/utf8>>}, {<<"data">>, ""}])
      end
    catch
      _:_ ->
        jsx:encode([{<<"code">>, 1}, {<<"msg">>, <<"error param"/utf8>>}, {<<"data">>, ""}])
    end,


  Req11 = cowboy_req:set_resp_header(<<"access-control-allow-origin">>, <<$*>>, Req),

  Req21 = cowboy_req:set_resp_header(<<"access-control-allow-methods">>, <<"POST">>, Req11),

  Req31 =
    cowboy_req:set_resp_header(<<"access-control-allow-headers">>, <<"content-type">>, Req21),
  NewReq11 = cowboy_req:set_resp_body(Result, Req31),
%%  io:format("~s~n",[NewReq11]),
  {true, NewReq11, State}.





