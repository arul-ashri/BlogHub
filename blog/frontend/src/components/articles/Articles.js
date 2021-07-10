import React,{Fragment,useEffect} from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { getArticles } from '../../actions/articleActions';
import { getCategories,getArticlesByCategory  } from '../../actions/categoryActions';

import Sugar from 'sugar';

import Pagination from './Pagination';

const Articles = ({articles,getArticles,pagination,getCategories,categories}) => {

    useEffect(() => {
        getArticles();
        getCategories();
        // eslint-disable-next-line
    },[])

    const button = {
        color: '#494949',
        textAlign: 'center',
        textTransform: 'uppercase',
        textDecoration: 'none',
        background: '#ffffff',
        fontSize: '20px',
        fontWeight: 'bold',
        border: '4px solid #494949',
        display: 'inline-block',
        borderRadius: "5%",
      };
return (
        <Fragment>

            <div className="row">
                <div className="col-md-12">
                    <h2 className="text-center text-dark">All Articles</h2>
                </div>
            </div>
            <hr/>

            <div className="row">

                    <div className="col-md-3">

                        <ul className="list-group">
                            <li className="list-group-item">All Categories</li>
                            {categories.map(category => (
                                <li key={category.id} className="list-group-item">
                                    <Link
                                    className="btn btn-link"
                                    to={'/category/articles/'+category.name + '/' +category.id + '/' }>
                                                {category.name}
                                            </Link>
                                </li>

                            ))}

                        </ul>
                    </div>

                    <div className="col-md-9">
                        <div className="row">
                            { articles.map(article => (
                                <div className="col-md-6"  key={article.id}>
                                    <div className="card border-primary mb-3" style={{maxWidth: "25rem",borderRadius:"3%"}}>
                                        <div className="card-header" style={button}>{article.title}</div>
                                        <img className="card-img-top" style={{height: "300px",overflow: 'hidden'}} src={article.image} alt="Card image cap" />
                                        <div className="card-body">
                                            <p className="card-text">{Sugar.String.truncate(article.content, 200)}</p>
                                            <p className="card-text">Writer : {article.owner ? article.owner.username : ''}</p>
                                            <p className="card-text">Created At : {Sugar.Date.format(new Date(article.created_at), '%Y-%m-%d')}</p>
                                            <div className="offset-md-2">
                                                <Link className="btn btn-link" to={'/read/more/'+article.title + '/' +article.id }>
                                                    Read More
                                                </Link>

                                                {
                                                    article.owner ? (
                                                        <Link className="btn btn-link" to={'/user/articles/'+article.owner.id + '/' +article.owner.username }>
                                                            View More of <strong> <i>{article.owner.username}</i></strong>
                                                        </Link>
                                                    ) : null
                                                }
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

            </div>

            <div className="row my-3 ">
                <div className="col-md-3"> </div>
                <div className="col-md-9">
                        <Pagination  pagination={pagination} />
                </div>
            </div>

        </Fragment>
    )
}

Articles.propTypes = {
    articles : PropTypes.array.isRequired,
    pagination : PropTypes.object,
    categories : PropTypes.array.isRequired,
    getArticles : PropTypes.func.isRequired,
    getCategories : PropTypes.func.isRequired,
};
const mapStateToProps = state => ({
    articles : state.article.articles,
    categories : state.category.categories,
    pagination : state.article.pagination
});

export default connect(mapStateToProps,{getArticles,getCategories})(Articles);
