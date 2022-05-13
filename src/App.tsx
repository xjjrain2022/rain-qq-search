import React, { useEffect, useState, ChangeEvent } from 'react';
import './App.css';
import qqService from './server/qq.service';
import useDebounce from './hooks/useDebounce';
import { QQInfoType } from './types/qq.types';
import { REG_QQ, REG_NON_NUMBER } from './util/regex.const';
import { MSG_QQ_INFO_ERR } from './util/msg.const';
import QqInfo from './components/qq-info';
import QqLoading from './components/qq-loading';


function App() {
  const [qq, setQQ] = useState<string>('');
  const [errorMsg, setErrorMsg] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [info, setInfo] = useState<QQInfoType>({});
  const debounceQQ = useDebounce(qq, 200);

  // 获取QQ信息
  const getQQInfo = async () => {
    setErrorMsg('');
    setLoading(true);
    const res = (await qqService.getQQInfo(debounceQQ)) as QQInfoType;
    setLoading(false);
    setInfo({});
    // 请求被取消或者是其它非正常错误
    if (!res || !res.code) {
      setErrorMsg('');
      return;
    }
    // 服务器未查到QQ
    if (res.code !== 1) {
      setErrorMsg(MSG_QQ_INFO_ERR);
      return;
    }

    setInfo(res);
    setErrorMsg('');
  };

  // 修改了输入框的QQ号
  const changeQQNumber = (e: ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value;
    value = value.trim().replace(REG_NON_NUMBER, '').slice(0, 15);
    setQQ(value);
  }

  useEffect(() => {
    if (debounceQQ && REG_QQ.test(debounceQQ)) {
      getQQInfo();
    } else {
      setErrorMsg('');
      setLoading(false);
      setInfo({});
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debounceQQ]);



  return (
    <div className="flex flex-v-cc App">
      <div className="qq-app">
        <header>QQ号查询</header>
        <div className="flex flex-h-lc qq-search">
          <span>QQ: </span>
          <div className="flex-1 qq-search__input">
            {loading && <div className="qq-search__loading">
              <QqLoading />
            </div>}
            <input type="text" value={qq} onChange={e => changeQQNumber(e)} />
          </div>
        </div>
        {
          errorMsg && info.code !== 1 && <div className="qq-error-msg">{errorMsg}</div>
        }
        {
          info.code === 1 && !errorMsg && <QqInfo {...info} />
        }

      </div>
    </div>
  );
}

export default App;
