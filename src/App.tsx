import React, { useEffect, useState, ChangeEvent } from 'react';
import './App.css';
import qqService from './server/qq.service';
import useThrottle from './hooks/useThrottle';
import { QQInfoType } from './types/qq.types';
import QqInfo from './components/qq-info';
import QqLoading from './components/qq-loading';

function App() {
  const [qq, setQQ] = useState<string>('');
  const [errorMsg, setErrorMsg] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [info, setInfo] = useState<QQInfoType>({});
  const tipMsg = '未查到这个号码的信息, 请检查号码是否正确';
  const qqRegex = /^[1-9][0-9]{4,14}$/;
  const numberRegex = /[^\d]/g;
  const getQQInfo = async () => {
    setErrorMsg('');
    setLoading(true);
    const res = (await qqService.getQQInfo(qq)) as QQInfoType;
    setLoading(false);
    if (res && res.code && res.code === 1) {
      setInfo(res);
      setErrorMsg('');
      return;
    }

    setInfo({});
    setErrorMsg(tipMsg)
  };
  const throttleFetch = useThrottle(getQQInfo, 400);
  const changeQQNumber = (e: ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value;
    value = value.trim().replace(numberRegex,'').slice(0, 14);
    setQQ(value);
  }
  useEffect(() => {
    if (qq && qqRegex.test(qq)) {
      throttleFetch();
    } else {
      setErrorMsg('');
      setLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [qq]);



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
