import React from 'react';
import Post from './posts/posts';
import Categories from './categories/categories';
const Home = () => {
    return (
    <div>
        <div>
            <Categories/>
        </div>
        <div>
            <Post/>
        </div>
    </div>
    );
}
export default Home;