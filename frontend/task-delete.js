export function confirmTaskDeletion(task) {
  const dialog = document.getElementById("deleteTaskDialog");
  document.getElementById("deleteTaskName").textContent = task.title || task.id;
  dialog.returnValue = "cancel";
  return new Promise(resolve => {
    dialog.addEventListener("close", () => resolve(dialog.returnValue === "delete"), {once: true});
    dialog.showModal();
  });
}
