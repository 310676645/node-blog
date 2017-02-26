/**
 * Created by songjd on 17/1/9.
 */

import common from '__ASSETS/js/common';

/**
 * @class
 * @description 验证策略类
 */

let strategies = {

    /**
     * isNotEmpty
     * @description 验证是否为空
     * @param {String} value - 验证的value
     * @param {String} [errorMsg='必填项不能为空'] - 验证失败的提示信息
     * @return {(String|undefined)} - 验证失败的提示信息
     */

    isNotEmpty(value, errorMsg = '必填项不能为空') {
        if (!common.trim(value) && value !== 0) {
            return errorMsg;
        }
    },

    /**
     * isNumber
     * @description 验证是否为数字
     * @param {String} value - 验证的value
     * @param {String} [errorMsg='请输入数字'] - 验证失败的提示信息
     * @return {(String|undefined)} - 验证失败的提示信息
     */

    isNumber(value, errorMsg = '请输入数字') {
        let val = common.trim(value);
        if (!/^[0-9]*$/.test(val)) {
            return errorMsg;
        }
    },

    /**
     * isNumber
     * @description 验证手机号格式是否正确
     * @param {String} value - 验证的value
     * @param {String} [errorMsg='手机号格式不正确'] - 验证失败的提示信息
     * @return {(String|undefined)} - 验证失败的提示信息
     */

    isTel(value, errorMsg = '手机号格式不正确') {
        if (!common.isTel(value)) return errorMsg;
    },

    /**
     * scope
     * @description 验证是否在有效范围内
     * @param {String} value - 验证的value
     * @param {String} [errorMsg='不在有效范围内'] - 验证失败的提示信息
     * @param {String} params - 范围参数,逗号分割
     * @return {(String|undefined)} - 验证失败的提示信息
     */

    scope(value, errorMsg = '不在有效范围内', params) {
        let arg = params.split(',') ;
        if(!(value >= Number(arg[0]) && value <= Number(arg[1]))) {
            return errorMsg;
        }
    }
};

/**
 * Validator
 * @description 表单验证类
 */

class Validator {
    constructor() {
        this.cache = [];
    }

    /**
     * add
     * @description 添加需要验证的字段
     * @param {*} val - 字段的value
     * @param {String} rule - 验证的规则
     * @param {String} errorMsg - 验证失败后提示信息
     */

    add(val, rule, errorMsg) {
        let errorMsgs = errorMsg.split('|');
        let rules = rule.split('|');
        rules.forEach((item, index) => {
            this.cache.push(function () {
                let arg = [];
                let params;
                let strategy = item.replace(/\((.+)\)/, function(matchingStr, $1) {
                    params = $1;
                    return '';
                });
                arg.push(val);
                let currentErrorMsg = errorMsgs[index];
                currentErrorMsg && arg.push(currentErrorMsg);
                params && arg.push(params);
                return strategies[strategy].apply(this, arg);
            });
        });
    }

    /**
     * 开始验证
     * @return {(String|undefined)} - 如果验证失败则返回失败后提示信息，如果成功则返回undefined
     */

    start() {
        for (let i = 0, validatorFunc; validatorFunc = this.cache[i++];) {
            let errorMsg = validatorFunc();
            if (errorMsg) {
                return errorMsg;
            }
        }
    }
}

export default Validator;