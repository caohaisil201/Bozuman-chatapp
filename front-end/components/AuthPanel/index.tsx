import * as React from 'react';

type Props = {
  
  children?: React.ReactNode
};

export default function AuthPanel({children}: Props) {
  return (
    <div className='AuthPanel'>
      {children}
    </div>
  )
}
