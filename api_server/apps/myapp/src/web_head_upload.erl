-module(web_head_upload).
-behaviour(cowboy_http_handler).
-export([init/3, handle/2, terminate/3]).
-include("../include/common.hrl"). 
init({_Transport, http}, Req, []) ->
	{ok, Req, {}}.

handle(Req, State) ->

{Method, Req2} = cowboy_req:method(Req),
		{P0, Req24} = cowboy_req:qs(Req), 		
		C13=binary_to_list(P0),

		[_,Uuid]=re:split(C13,"="),
		B=binary_to_list(Uuid),
        [AX,BX]=re:split(B,"&"),

GX=binary_to_list(AX),
		{Path,Req33}= cowboy_req:path(Req),


%net_adm:ping('dog31@192.168.80.31'),
case binary_to_list(Method) of
	"POST"->
        Vssid=GX,	

	case binary_to_list(BX) of
		"pic"->
			{Result, Req90} = acc_multipart(Req),
			writeToFile(Result,Vssid),
			{ok, Req91} = cowboy_req:reply(200, [], " ", Req90), %%  result  changed 1
			{ok, Req91, State};
		
		_->
		cowboy_req:reply(200, [], "-3", Req24),
		{ok, Req, State}
	end;
	"GET" ->
		Vssid=GX,
		case binary_to_list(BX) of
			"pic"->	
				Ddata=rdfile(Vssid),
				{ok, Req91} = cowboy_req:reply(200, [], Ddata, Req),
				{ok, Req91, State};
			 _->
				cowboy_req:reply(200, [], "-3", Req),
				{ok, Req, State}
		end;

%%-------------------------------------------------------------------------------------------------------------
	_ ->
  		 {ok, Reqp} = cowboy_req:reply(200, [], <<"-3">>, Req),
   		 {ok, Reqp, State}
end.

writeToFile(Result,Ne) ->
%	rpc:call('dog31@192.168.80.31',head_up_down,write_to_file,[Result,Ne]),ok.
    {ok, IoDevice} = file:open("./"++Ne++".png", [raw, write]),
    file:write(IoDevice, Result),
    file:close(IoDevice), ok.

rdfile(Ne)-> 
%	//Data=rpc:call('dog31@192.168.80.31',head_up_down,rdfile,[Ne]),
%	//Data.

        F="./pic/"++Ne++".png",
%io:format("~p~n",F).
 	   {ok,Data}= file:read_file(F),Data.

%	{ok,File}=file:open("./pic/"++ne++".png",[raw,read]),
%	Data=rdfile(Vssid),
%	{ok,Data}=file:read(File,filelib:filesize("./pic/"++ne++".png")),
%	file:close(File),
%	Data.

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
		[ list_to_binary(lists:reverse(BodyAcc))|Acc]);
acc_multipart({eof, Req}, Acc) ->
	{lists:reverse(Acc), Req}.

