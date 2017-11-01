import React from 'react';
import {Card, Segment} from 'semantic-ui-react';
import Comments from '../comments/comments';
const PostLanding = ({match}) => {
    return (
        <Card fluid>
            <Card.Header>
            <Segment color='green'>Post Landing</Segment>
                </Card.Header>
            <Card.Content extra>
                <h1>PostLanding {match.params.id}</h1>
                <Comments/>
            </Card.Content>
        </Card>  
    );
}

export default PostLanding;