<template>
  <div class="modal-wrapper">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h6 class="modal-title"> <i class="fas fa-sign-out-alt"></i> 로그아웃</h6>
        </div>
        <div class="modal-body">
          정말로 로그아웃 하시겠습니까? <i class="far fa-sad-tear"></i>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-danger" @click="onLogOut">로그아웃</button>
          <button type="button" class="btn btn-secondary" @click="onClose">취소</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  setup (props, { emit }) {
    const onLogOut = () => {
      emit('logout')
    }
    const onClose = () => {
      emit('close')
    }
    return {
      onLogOut,
      onClose
    }
  }
}
</script>

<style scoped>
  .modal-wrapper {
    position: fixed;
    z-index: 100;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
  }
</style>
