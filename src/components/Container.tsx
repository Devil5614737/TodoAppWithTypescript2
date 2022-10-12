import React, { ReactNode } from 'react';


interface PropsI{
    children:ReactNode;
}

export const Container = ({children}:PropsI) => {
  return (
    <div className='container'>{children}</div>
  )
}
