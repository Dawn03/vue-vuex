import service from './request'

export const getPersonInfo = data => {
    return service({
        url: '/login',
        method: 'post',
        data
    })
};
export const getAllMoviData = data => {
    return service({
        url: '/getMovieList',
        method: 'post',
        data
    })
};
export const deleteMovie = data => {
    return service({
        url: `/deleteMovie/${data}`,
        method: 'delete',
        data: {}
    })
};
export const updataMovie = data => {
    return service({
        url: `/modifyMovie/${data.id}`,
        method: 'put',
        data: data.form
    })
};
export const getHero = data => {
    return service({
        url: '/getHeroList',
        method: 'post',
        data
    })
};

