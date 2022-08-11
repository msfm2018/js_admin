-module(http_handler_multipart).
-behaviour(cowboy_http_handler).
-export([init/3, handle/2, terminate/3]).
-include("../include/common.hrl"). 
init({_Transport, http}, Req, []) ->
	{ok, Req, {}}.

handle(Req, State) ->
	{Result, Req2} = acc_multipart(Req),
writeToFile(Result),
%C="abc",
%Ssql=lists:concat(["INSERT INTO test (imgx) VALUES('",Result,"')"]), 
%io:format("~p~n",[Ssql]),
%[[A],_]=Result,
				%emysql:execute(?DB,Ssql),
%io:format("-------"),
%io:format(binary_to_list(A)),
%io:format("-----------------"),
	{ok, Req3} = cowboy_req:reply(200, [], Result, Req2),
	{ok, Req3, State}.

terminate(_, _, _) ->
	ok.

acc_multipart(Req) ->
	acc_multipart(cowboy_req:multipart_data(Req), []).

acc_multipart({headers, Headers, Req}, Acc) ->
	acc_multipart(cowboy_req:multipart_data(Req), [[]|Acc]);
acc_multipart({body, Data, Req}, [ BodyAcc|Acc]) ->
	acc_multipart(cowboy_req:multipart_data(Req), [ [Data|BodyAcc]|Acc]);

acc_multipart({end_of_part, Req}, [ BodyAcc|Acc]) ->
	acc_multipart(cowboy_req:multipart_data(Req),
		[ lists:reverse(BodyAcc)|Acc]);
acc_multipart({eof, Req}, Acc) ->
	{lists:reverse(Acc), Req}.%list_to_binary(

writeToFile(Result) ->
    {ok, IoDevice} = file:open("out.png", [raw, write]),
    file:write(IoDevice, Result),
    file:close(IoDevice), ok.
