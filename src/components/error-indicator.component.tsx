import React from 'react';

import errorImage from "../assets/img/error-img.png";


interface IErrorIndicator {
  children: React.ReactNode
}

interface IErrorFallback {
  error: {
    message: string
  }
}

const ErrorIndicator = (props: IErrorIndicator) => {
  const { children } = props;

  return(
    <div className="error">
      <h3 className="error--header">Возникла ошибка</h3>
      <img className="error--image" title="error" alt="error-alert" src={ errorImage } />
      <p className="error--message">
        { children }
      </p>
    </div>
  )
}


const ErrorFallback = (props: IErrorFallback) => {
  const { error } = props;
  console.error(error)

  return (
    <ErrorIndicator>
      Что-то пошло не так, но мы скоро все починим
    </ErrorIndicator>
  )
}

export {
  ErrorIndicator,
  ErrorFallback
};
