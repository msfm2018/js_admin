%%%-------------------------------------------------------------------
%% @doc myapp public API
%% @end
%%%-------------------------------------------------------------------

-module(myapp_app).

-behaviour(application).

%% Application callbacks
-export([start/2, stop/1]).

%%====================================================================
%% APIapi_user_rooms
%%====================================================================
%%面向企业 api
start(_StartType, _StartArgs) ->
  Dispatch = cowboy_router:compile([
    {'_', [
      %%重要新闻列表
      {"/api_news_important", api_news_important, []},
      %%      模糊查询
      {"/api_unnews_important", api_unnews_important, []},
      %%重要新闻明细
      {"/api_news_important_detail", api_news_important_detail, []},
      %% 更新重要新闻
      {"/api_news_important_update", api_news_important_update, []},
      %% 删除重要新闻
      {"/api_news_important_del", api_news_important_del, []},
      %%      添加重要新闻
      {"/api_news_important_add", api_news_important_add, []},
%%      批量删除
      {"/api_news_important_batchdel", api_news_important_batchdel, []},

%%      分页
      {"/api_news_splide", api_news_splide, []},



      {"/api_delword", api_delword, []},

      {"/http_handler_multipart", http_handler_multipart, []},
      {"/web_head_upload", web_head_upload, []}


    ]}
  ]),
  {ok, _} = cowboy:start_clear(http, [{port, 9011}, {max_connections, infinity}], #{env => #{dispatch => Dispatch}}),


  myapp_sup:start_link().


%%--------------------------------------------------------------------
stop(_State) ->
  ok.

%%====================================================================
%% Internal functions
%%====================================================================
