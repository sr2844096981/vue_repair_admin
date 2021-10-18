import Vue from "vue";
import Vuex from 'vuex';
import axios from "axios"

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        // 所有任务列表
        list: [],
        // 输入框内容
        inputValue: 'aBa',
        // 下一项的id
        nextId: 2,
        // tab 选中状态
        tabPosition: "",
        // tab 数据
        listInfo: []
    },
    mutations: {
        initList(state, list) {
            state.list = list
        },
        // 为state中的inputValue赋值
        setInputValue(state, val) {
            state.inputValue = val
        },
        // 添加列表项
        addItem(state) {
            const obj = {
                id: state.nextId,
                info: state.inputValue,
                done: false
            }
            state.list.push(obj);
            state.nextId++;
            state.inputValue = "";
        },
        // 根据id删除对应事项
        removeItem(state, id) {
            // 查找id对应的索引
            const index = state.list.findIndex(item => item.id === id)
            if (index !== -1) {
                state.list.splice(index, 1)
            }
        },
        // 根据id修改事项完成状态
        finishItem(state, id) {
            const index = state.list.findIndex(item => item.id === id)
            if (index !== -1) {
                state.list[index].done = true
            }
        },
        // 清除已完成
        clearFinish(state) {
            state.list = state.list.filter(item => item.done === false)
        },
        // 存储tab changeTab
        changeTab(state, tabPosition) {
            state.tabPosition = tabPosition
        },

    },
    actions: {
        getList(context) {
            axios.get('/list.json').then(({ data }) => {
                console.log(data);
                context.commit('initList', data)
            })
        }
    },
    getters: {
        // 统计未完成条数
        unDoneLength(state) {
            return state.list.filter(item => item.done === false).length
        },
        // 切换Tab 列表数据
        listInfo(state) {
            switch (state.tabPosition) {
                case "all":
                    return state.listInfo = state.list
                case "finish":
                    return state.listInfo = state.list.filter(item => item.done === true)
                case "unfinish":
                    return state.listInfo = state.list.filter(item => item.done === false)
                default:
                    return state.listInfo = state.list
            }
        }
    }
})