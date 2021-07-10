import React,{Fragment,useEffect} from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { getArticleById } from '../../actions/articleActions';

import Sugar from 'sugar';
import ReactPlayer from 'react-player'

import Pagination from './Pagination';

const Article = ({article,getArticleById,match}) => {
    useEffect(() => {
        getArticleById(match.params.article_id);

        // eslint-disable-next-line
    },[])
    const button = {
        color: '#494949',
        textAlign: 'center',
        textTransform: 'uppercase',
        fontSize: '40px',
        fontWeight: 'bold',
      };


    return (
        <Fragment>
            <h1 className="my-4" style={button}>~{article.title}~</h1>


            <div className="row">

                <div className="col-md-7">
                    <img className="img-fluid" src={article.image} alt="" />
                </div>

                <div className="col-md-5">
                    <h3 className="my-3">Article Description</h3>
                    <p className="text-justify">
                        {article.content}
                    </p>
                    <h3 className="my-3">Article Details</h3>
                    <ul>
                        { article.owner  ? (
                            <Fragment>
                                <li>Wrtiter Name : {article.owner.username}</li>
                                <li>Wrtiter Email : {article.owner.email}</li>
                                <li>Category : { article.category ? article.category.name : ''}</li>
                                <li>Created At : {Sugar.Date.format(new Date(article.created_at), '%Y-%m-%d')}</li>

                            </Fragment>
                        ) : null

                        }

                    </ul>
                </div>

                   
            </div>
            <div className="row  m-3 ">
                <div className="col align-self-center ">
                    { article.video_url ? (
                        <ReactPlayer url={article.video_url} controls={true} />
                    ) : null
                    }     
                </div>
            </div>

            <div className="row">
                     <div className="fb-like col-12 mt-3" style={{ display: "flex",justifyContent: "center",alignItems: "center",}} data-href={"http://localhost:8000/#/read/more/" + article.title+"/"+article.id} data-width="" data-layout="button_count" data-action="like" data-size="large" data-share="true"></div>
                    <div className="fb-comments col-12"style={{ display: "flex",justifyContent: "center",alignItems: "center",}}  data-href={"http://localhost:8000/#/read/more/" + article.title+"/"+article.id} data-width="" data-numposts="5"></div>
            </div>  

           
        </Fragment>
    )
}

Article.propTypes = {
    article : PropTypes.object.isRequired,
    getArticleById : PropTypes.func.isRequired,
};
const mapStateToProps = state => ({
    article : state.article.article,

});

export default connect(mapStateToProps,{getArticleById})(Article);
