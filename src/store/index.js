
import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import Test1 from './modules/test1/test1'
import Router from '../router/index'
import {
    getPersonInfo,
    getAllMoviData,
    getHero
} from '../http/api'
Vue.use(Vuex)
import {
    COUNT_ADD,
    TEST,
    GET_HERO_LIST
} from './mutations-type'

const store = new Vuex.Store({
    modules: {
        Test1: Test1
    },
    state: {
        Authorization: localStorage.getItem('Authorization') ? localStorage.getItem('Authorization') : '',
        // movieList: [],
        movieListData: {},
        movieListAll: {}, //电影全部数据 不分页
        movieTypeCount: {}, //电影统计
        heroList: [],
        heroTotal: 0,
        allHeroList: [],
        person: {
            name: '',
            age: 0
        },
        arr: [1, 2, 3, 4, 5],
        testStr: '测试字符串',
        todos: [
            { id: 1, text: '...', done: true },
            { id: 2, text: '...', done: false },
            { id: 3, text: '...', done: true },
            { id: 4, text: '...', done: false },
            { id: 5, text: '...', done: true },
            { id: 6, text: '...', done: false },
        ]
    },
    //放异步
    actions: {
        login(state, data) {
            getPersonInfo(data).then((res) => {
                if (res) {
                    if (res.status == 'success') {
                        state.Authorization = data.username;
                        localStorage.setItem('Authorization', data.username);
                        Router.push('/')
                    }
                }
            })
        },
        setUser(state, data) {

        },
        async getALLMovie({ commit }, payload = {}) {
            await getAllMoviData(payload).then(res => {
                commit('GET_ALL_MOVIE_LIST', res.movieList)
            })
        },
        // async  getALLMovie({ commit }, payload = {}) {
        //     await axios.post("/api/getMovieList", payload)
        //         .then(res => {
        //             commit('GET_ALL_MOVIE_LIST', res.data.movieList)
        //         })
        // },
        //获取电影
        getMovies({ commit }, payload = {}) {
            getAllMoviData(payload).then((res) => {
                let obj = {
                    loving: "爱情",
                    action: "动作",
                    comedy: "喜剧",
                    criminal: "犯罪",
                    inference: "推理"
                }
                let temp = res.movieList
                for (let i = 0, len = temp.length; i < len; i++) {
                    temp[i]['changeMovieType'] = JSON.parse(JSON.stringify(temp[i].movieType))
                    for (let j = 0; j < temp[i].movieType.length; j++) {
                        temp[i]['changeMovieType'][j] = obj[temp[i].movieType[j]]
                    }
                }
                let tempData = {
                    total: res.total,
                    movieList: temp
                }
                commit('GET_MOVIE_LIST', tempData)
            })
        },
        //新增电影
        addMovies({ commit }, payload) {
            axios.post("/api/addMovie", payload)
                .then(res => {
                    // console.log(38, res);
                });
        },
        getHeroList({ commit }, payload) {
            let obj = {}
            for (let key in payload) {
                if (payload[key]) {
                    obj[key] = payload[key]
                }
            }
            getHero(obj).then((res) => {
                let result = res.heroList;

                for (let i = 0; i < result.length; i++) {
                    result[i].heroSexChange = result[i].heroSex == "man" ? "男" : "女";
                    for (let j = 0; j < result[i].heroPosition.length; j++) {
                        switch (result[i].heroPosition[j]) {
                            case "mid":
                                result[i].heroPosition[j] = "中单 ";
                                break;
                            case "miss":
                                result[i].heroPosition[j] = "上单 ";
                                break;
                            case "support":
                                result[i].heroPosition[j] = "辅助 ";
                                break;
                            case "ad":
                                result[i].heroPosition[j] = "AD-Carry ";
                                break;
                            case "jungle":
                                result[i].heroPosition[j] = "打野 ";
                                break;
                        }
                    }
                }
                let obj = {
                    total: res.total,
                    heroList: res.heroList,
                }
                commit('GET_HERO_LIST', obj)
            })
            // axios.post('/api/getHeroList', obj)
            //     .then((res) => {
            //         commit('GET_HERO_LIST', res.data.heroList)
            //     })
        },
    },
    //放同步
    mutations: {
        updateStr(state, data) {
            state.testStr = data
        },
        getDtype(state) {
            let obj = {}
            let arrCount = [] // 计数
            let arrType = [] // 统计类型
            let temp = state.movieListAll
            for (let i = 0, len = temp.length; i < len; i++) {
                if (obj[temp[i].dType] == undefined) {
                    obj[temp[i].dType] = 1
                } else {
                    obj[temp[i].dType] += 1
                }
            }
            console.log(117, obj)
            for (let key in obj) {
                arrCount.push(obj[key])
                arrType.push(key)
            }
            let objData = {
                arrCount,
                arrType
            }
            state.movieTypeCount = objData
        },
        getMovieType(state) {
            let obj = {}
            let arrCount = [] // 计数
            let arrType = [] // 统计类型
            let map = {
                loving: '爱情',
                action: '动作',
                comedy: '喜剧',
                criminal: '犯罪',
                inference: '推理',
            }
            let temp = state.movieListAll
            for (let i = 0, len = temp.length; i < len; i++) {
                for (let j = 0; j < temp[i].movieType.length; j++) {
                    if (obj[temp[i].movieType[j]] == undefined) {
                        obj[temp[i].movieType[j]] = 1
                    } else {
                        obj[temp[i].movieType[j]] += 1
                    }
                }
            }
            for (let key in obj) {
                arrCount.push(obj[key])
                arrType.push(map[key])
            }
            let objData = {
                arrCount,
                arrType
            }
            state.movieTypeCount = objData
        },
        GET_ALL_MOVIE_LIST(state, data) {
            state.movieListAll = data
        },
        GET_MOVIE_LIST(state, data) {
            state.movieListData = data
        },

        [GET_HERO_LIST](state, data) {
            console.log(248, data)
            state.heroList = data.heroList
            state.heroTotal = data.total
        },

        [COUNT_ADD](state, payload) {
            state.person.age += payload.age
            state.person.name = payload.name
            state.person = { ...state.person, newProp: 123 }

            console.log(17, state.person)
        },
        increment(state) {
            for (let i = 0; i < state.arr.length; i++) {
                state.arr[i]++
            }
            console.log(17, state.arr)
        },
        [TEST](state) {
            console.log(53)
        }
    },
    getters: {
        arr: (state) => state.arr,
        todoData: (state) => state.todos.filter(todo => todo.done),
    }
})

export default store