<template>
  <div class="modal-form">
    <div class="modal">
      <div class="field-con">
        <label for="title">Task Title</label>
        <input type="text" placeholder="Enter Task Title" />
      </div>
      <div class="btn-con">
        <button @click="$emit('close-form')">Close</button>
        <button>Add Task</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
};
</script>

<style scoped>
.modal {
  padding: 20px;
  background: #ffffff;
}

.modal-form {
  position: relative;
  background: #ffffff;
  margin: 40px auto;
  border-radius: 4px;
  width: 800px;
  z-index: 2;
  padding: 40px 20px;
  filter: drop-shadow(0 20px 13px rgb(0 0 0 / 0.03))
    drop-shadow(0 8px 5px rgb(0 0 0 / 0.08));
}

.field-con {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.btn-con {
  padding: 20px 0 0 0;
  display: flex;
  justify-content: flex-end;
  gap: 10px;
}

.btn-con button {
  border: none;
  cursor: pointer;
  padding: 12px 16px;
  transition: 0.2s;
  border-radius: 4px;
}

.btn-con button:first-child {
  background: #ffffff;
  box-shadow: 0 1px 8px rgba(0, 0, 0, 0.16);
}

.btn-con button:first-child:hover {
  background: #efefef;
}

.btn-con button:last-child {
  background: #673de6;
  color: #ffffff;
}

.btn-con button:last-child:hover {
  background: #5025d1;
}

.field-con input {
  border-radius: 5px;
  border: 1px solid #888888;
  padding: 10px;
}
</style>


