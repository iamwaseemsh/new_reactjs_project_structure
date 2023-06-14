import React from 'react'
import { useAddPostsMutation, useGetPostsQuery } from '../manager/product_services.api';

export default function ProductListingScreens() {
    const { data, isLoading,error,isError } = useGetPostsQuery();

    const [addPosts, { isLoading : addLoading}] = useAddPostsMutation();
    const handleOnclick=(e)=>{
        e.preventDefault();
        addPosts({
            title: 'test product',
            price: 13.5,
            description: 'lorem ipsum set',
            image: 'https://i.pravatar.cc',
            category: 'electronic'
        })

    }

    if (isError) {
        return <div>Error occurred while fetching posts: {error.message}</div>;
      }
    if (isLoading) {
        return (<div>
            Loading
        </div>);
    }
    return (
        <div>
            {data.length}
          {addLoading?<div>
            Add loading
            </div>:  <div>
                <button onClick={handleOnclick}>Test</button>
            </div>}
        </div>
    )
}

