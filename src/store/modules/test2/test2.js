
// import Vue from 'vue'
// import Vuex from 'vuex'
// import axios from 'axios'
// import Test1 from './modules/test1/test1'
// import Router from '../router/index'
// import {
//     getPersonInfo,
//     getAllMoviData
// } from '../http/api'
// Vue.use(Vuex)
// import {
//     COUNT_ADD,
//     TEST,
//     GET_HERO_LIST
// } from './mutations-type'

// const store = new Vuex.Store({
//     modules: {
//         Test1: Test1
//     },
//     state: {
//         Authorization: localStorage.getItem('Authorization') ? localStorage.getItem('Authorization') : '',
//         // movieList: [],
//         movieListData: {},
//         movieListAll: {}, //电影全部数据 不分页
//         movieTypeCount: {}, //电影统计
//         heroList: [],
//         allHeroList: [],
//         person: {
//             name: '',
//             age: 0
//         },
//         arr: [1, 2, 3, 4, 5],
//         testStr: '测试字符串',
//         todos: [
//             { id: 1, text: '...', done: true },
//             { id: 2, text: '...', done: false },
//             { id: 3, text: '...', done: true },
//             { id: 4, text: '...', done: false },
//             { id: 5, text: '...', done: true },
//             { id: 6, text: '...', done: false },
//         ]
//     },
//     //放异步
//     actions: {
//         login(state, data) {
//             getPersonInfo(data).then((res) => {
//                 if (res) {
//                     if (res.status == 'success') {
//                         state.Authorization = data.username;
//                         localStorage.setItem('Authorization', data.username);
//                         Router.push('/')
//                     }
//                 }
//             })
//         },
//         setUser(state, data) {

//         },
//         getALLMovie({ commit }, payload = {}) {
//             getAllMoviData(payload)
//         },
//         // async  getALLMovie({ commit }, payload = {}) {
//         //     await axios.post("/api/getMovieList", payload)
//         //         .then(res => {
//         //             commit('GET_ALL_MOVIE_LIST', res.data.movieList)
//         //         })
//         // },
//         //获取电影
//         getMovies({ commit }, payload = {}) {
//             console.log(35, payload)
//             axios.post("/api/getMovieList", payload)
//                 .then(res => {
//                     let obj = {
//                         loving: "爱情",
//                         action: "动作",
//                         comedy: "喜剧",
//                         criminal: "犯罪",
//                         inference: "推理"
//                     }
//                     let temp = res.data.movieList
//                     console.log(48, res.data, temp.length)
//                     for (let i = 0, len = temp.length; i < len; i++) {
//                         temp[i]['changeMovieType'] = JSON.parse(JSON.stringify(temp[i].movieType))
//                         for (let j = 0; j < temp[i].movieType.length; j++) {
//                             temp[i]['changeMovieType'][j] = obj[temp[i].movieType[j]]
//                         }
//                     }
//                     let tempData = {
//                         total: res.data.total,
//                         movieList: temp
//                     }
//                     console.log(36, res.data.movieList);
//                     commit('GET_MOVIE_LIST', tempData)
//                 });
//         },
//         //新增电影
//         addMovies({ commit }, payload) {
//             axios.post("/api/addMovie", payload)
//                 .then(res => {
//                     console.log(38, res);
//                 });
//         },
//         getHeroList({ commit }, payload) {

//             let obj = {}
//             for (let key in payload) {
//                 if (payload[key]) {
//                     obj[key] = payload[key]
//                 }
//             }
//             console.log('dispatch', obj)

//             axios.post('/api/getHeroList', obj)
//                 .then((res) => {
//                     commit('GET_HERO_LIST', res.data.heroList)
//                 })
//         },
//     },
//     //放同步
//     mutations: {


//         updateStr(state, data) {
//             state.testStr = data
//         },
//         getDtype(state) {
//             let obj = {}
//             let arrCount = [] // 计数
//             let arrType = [] // 统计类型
//             let temp = state.movieListAll
//             console.log(108, temp)
//             for (let i = 0, len = temp.length; i < len; i++) {
//                 if (obj[temp[i].dType] == undefined) {
//                     obj[temp[i].dType] = 1
//                 } else {
//                     obj[temp[i].dType] += 1
//                 }
//                 // for (let j = 0; j < temp[i].dType.length; j++) {
//                 //     if (obj[temp[i].dType[j]] == undefined) {
//                 //         obj[temp[i].dType[j]] = 1
//                 //     } else {
//                 //         obj[temp[i].dType[j]] += 1
//                 //     }
//                 // }
//             }
//             console.log(117, obj)
//             for (let key in obj) {
//                 arrCount.push(obj[key])
//                 arrType.push(key)
//             }
//             let objData = {
//                 arrCount,
//                 arrType
//             }
//             state.movieTypeCount = objData
//         },
//         getMovieType(state) {
//             let obj = {}
//             let arrCount = [] // 计数
//             let arrType = [] // 统计类型
//             let map = {
//                 loving: '爱情',
//                 action: '动作',
//                 comedy: '喜剧',
//                 criminal: '犯罪',
//                 inference: '推理',
//             }
//             let temp = state.movieListAll
//             for (let i = 0, len = temp.length; i < len; i++) {
//                 for (let j = 0; j < temp[i].movieType.length; j++) {
//                     if (obj[temp[i].movieType[j]] == undefined) {
//                         obj[temp[i].movieType[j]] = 1
//                     } else {
//                         obj[temp[i].movieType[j]] += 1
//                     }
//                 }
//             }
//             for (let key in obj) {
//                 arrCount.push(obj[key])
//                 arrType.push(map[key])
//             }
//             let objData = {
//                 arrCount,
//                 arrType
//             }
//             state.movieTypeCount = objData
//         },
//         GET_ALL_MOVIE_LIST(state, data) {
//             state.movieListAll = data
//             console.log(2)
//         },
//         GET_MOVIE_LIST(state, data) {
//             state.movieListData = data
//             console.log(45, data)
//         },

//         [GET_HERO_LIST](state, data) {
//             state.heroList = data
//         },

//         [COUNT_ADD](state, payload) {
//             // state.person = {
//             //     age: state.person.age + payload.age,
//             //     name: payload.name
//             // }
//             state.person.age += payload.age
//             state.person.name = payload.name
//             state.person = { ...state.person, newProp: 123 }

//             console.log(17, state.person)
//         },
//         increment(state) {
//             for (let i = 0; i < state.arr.length; i++) {
//                 state.arr[i]++
//             }
//             console.log(17, state.arr)
//         },
//         [TEST](state) {
//             console.log(53)
//         }
//     },
//     getters: {
//         arr: (state) => state.arr,
//         todoData: (state) => state.todos.filter(todo => todo.done),
//     }
// })

// export default store