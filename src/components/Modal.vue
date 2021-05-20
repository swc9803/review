<template>
  <div class="modal-wrapper">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h6 class="modal-title"> <i class="fas fa-trash" style="color: gray"></i> 게시글 삭제</h6>
        </div>
        <div class="modal-body">
          정말로 삭제하시겠습니까? <i class="far fa-sad-tear"></i>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-danger" @click="onDelete">삭제</button>
          <button type="button" class="btn btn-secondary" @click="onClose">취소</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  setup (props, { emit }) {
    const onClose = () => {
      emit('close')
    }
    const onDelete = () => {
      emit('delete')
    }
    return {
      onClose,
      onDelete
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
