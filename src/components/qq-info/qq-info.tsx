import React from 'react';
import { QQInfoType } from '../../types/qq.types';

function QqInfo(props: QQInfoType) {

  const {qlogo, name, qq} = props;

  return (
    <div className="flex flex-h-lc qq-info">
      <div className="qq-info__avatar" style={{ backgroundImage: `url(${qlogo})` }}></div>
      <div className="flex-1 flex flex-v-sa qq-info__detail">
        <div>{name}</div>
        <div>{qq}</div>
      </div>
    </div>
  );
}

export default QqInfo;
