import React from 'react';
// import * as posts from './actions/postActions';
import Categories from './categories/categories';
import Post from './posts/posts';
const Home = () => {
    return (
    <div>
        <Post/>
        <Categories/>
    </div>
    );
}
export default Home;