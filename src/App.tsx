import React from 'react';
import './App.css';

const logo = 'https://img1.baidu.com/it/u=536263542,3428748979&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500';

function App() {
  return (
    <div className="flex flex-v-cc App">
      <div className="qq-app">
        <header>QQ号查询</header>
        <div className="flex flex-h-lc qq-search">
          <span>QQ: </span>
          <input className="flex-1" type="text" />
        </div>
        <div className="flex flex-h-lc qq-info">
          <div className="qq-info__avatar" style={{ backgroundImage: `url(${logo})` }}></div>
          <div className="flex-1 flex flex-v-sa qq-info__detail">
            <div>叛逆的小孩</div>
            <div>3847555</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
