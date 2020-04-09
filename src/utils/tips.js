import Vue from 'vue'

export function tipFuc(res) {
    const $vue = new Vue()

    if (res.code === 200) {
        $vue.$message({
            showClose: true,
            message: res.message,
            type: 'success'
        })
    } else {
        $vue.$message({
            showClose: true,
            message: res.message,
            type: 'error'
        })
    }
}