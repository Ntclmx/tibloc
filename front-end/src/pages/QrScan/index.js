import React, { useState, useContext, useEffect } from 'react';
import { QrReader } from 'react-qr-reader';

const QrScan = () => {
  const [showQR, setShowQR] = useState(false);

  const handleScanError = (error) => {
    console.log('aaaaa', error);
  }

  const handleScan = (result) => {
    console.log('result', result);
  }


  return (
    <div>
      <QrReader
          onError={handleScanError}
          onScan={handleScan}
          delay={300}
          style={{width:'100%'}}
          
        />

    </div>
  )
}

export default QrScan