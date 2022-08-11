%% coding: utf-8
-module(api_news_important_batchdel).

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
      Ids = maps:get(<<"id">>, Map),
%%      Sql3 = lists:flatten(io_lib:format("delete from news where id= ~p", [Ids])),
%%      io:format("~p~n", [Sql3]),

      mysql_poolboy:transaction(pool1, fun(Pid) ->
        L1 = string:tokens(binary_to_list(Ids), ","),
        [mysql:query(Pid, "delete from news where id= ?", [V]) || V <- L1]
                                       end),


      jsx:encode([{<<"code">>, 0}, {<<"msg">>, <<"succ"/utf8>>}, {<<"data">>, <<"ok">>}])
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





