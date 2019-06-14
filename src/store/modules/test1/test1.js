const state = {
    test1: 'test1'
}
//放异步
const actions = {
    test1Func() {
        console.log('test1Func')
    }

}
//放同步
const mutations = {

}
const getters = {

}

let obj = {
    state,
    actions,
    mutations,
    getters,
}
export default obj