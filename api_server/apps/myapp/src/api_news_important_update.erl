%% coding: utf-8
-module(api_news_important_update).

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

      Uri_string = http_uri:decode(A),
  io:format("99999999999999999999~s~n",[Uri_string]),
  Map = jsx:decode(Uri_string, [return_maps]),
  io:format("~p~n",[Map]),
  Result =
    try
      Id = maps:get(<<"id">>, Map),
      io:format("cccccccc~p~n",[Id]),
      Title = maps:get(<<"title">>, Map),
      io:format("cccccccc~s~n",[binary_to_list(Title)]),
      Content = maps:get(<<"content">>, Map),
      io:format("Content::::::~s~n",[binary_to_list(Content)]),

      Sql3 =
        lists:flatten(
          io_lib:format("update news set title='~s',content='~s' where id= ~p",
            [binary_to_list( Title),binary_to_list(Content),Id])),
      io:format("sql:::::~p~n", [Sql3]),

      try
        ok = mysql_poolboy:query(pool1, Sql3),



        jsx:encode([{<<"code">>, 0}, {<<"msg">>, <<"succ"/utf8>>}, {<<"data">>, <<"ok">>} ])
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





