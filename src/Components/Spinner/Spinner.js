//import React from 'react';
import { TailSpin } from 'react-loader-spinner';

const Spinner = () => {
  return (
    <div className="flex flex-col justify-center items-center fixed inset-0 z-50 bg-white bg-opacity-75">
      <TailSpin
        height={100}
        width={100}
        color="#f5385d"
        radius="1"
        visible={true}
      />
    </div>
  );
};

export default Spinner;