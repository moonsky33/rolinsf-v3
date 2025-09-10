// src/views/Login/hooks/useCountDown.js
import { ref, onUnmounted } from 'vue'

/**
 * 通用倒计时钩子
 * @param {number} initialTime - 初始倒计时时间（默认60秒）
 * @returns {Object} - { countDown: 倒计时状态, startCountDown: 开始倒计时, stopCountDown: 停止倒计时 }
 */
export const useCountDown = (initialTime = 60) => {
  const countDown = ref(0)
  let timer = null

  // 开始倒计时
  const startCountDown = () => {
    stopCountDown() // 先清除旧定时器，避免重复
    countDown.value = initialTime
    timer = setInterval(() => {
      countDown.value--
      if (countDown.value <= 0) {
        stopCountDown()
      }
    }, 1000)
  }

  // 停止倒计时
  const stopCountDown = () => {
    if (timer) {
      clearInterval(timer)
      timer = null
    }
    countDown.value = 0
  }

  // 组件卸载时清除定时器（避免内存泄漏）
  onUnmounted(() => {
    stopCountDown()
  })

  return { countDown, startCountDown, stopCountDown }
}