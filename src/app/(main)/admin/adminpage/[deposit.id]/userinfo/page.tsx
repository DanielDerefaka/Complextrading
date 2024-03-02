import React from 'react'

type Props = {
  
  params: { userId: string };
};


const page = async ({ params }: Props) => {
  return (
    <div>User Inf</div>
  )
}

export default page