"use strict";

// selectors and global variables
const setGoalForm = document.querySelector(".goal");
const progressSection = document.querySelector(".progress-section");
const goalH2 = document.querySelector(".goal-heading");
const progressH3 = document.querySelector(".progress-heading");
const progressBar = document.querySelector(".bar");
let goal = 0;
let progress = 0;
let lsGoal = localStorage.getItem("goal");
let lsProgress = localStorage.getItem("progress");
if (lsGoal) {
  goal = +lsGoal;
}
if (lsProgress) {
  progress = +lsProgress;
}
// console.log(goal);
// console.log(progress);

// functions
const getPercent = () => {
  const percent = (progress / goal) * 100;
  if (percent >= 100) {
    return "100%";
  } else {
    return percent + "%";
  }
};

const updateProgressHtml = () => {
  progressH3.textContent = `${progress} of ${goal}oz`;
  progressBar.style.width = getPercent();
};

const showHideHtml = () => {
  if (goal > 0) {
    setGoalForm.classList.add("hide");
    progressSection.classList.remove("hide");
    goalH2.classList.remove("hide");
    goalH2.textContent = `Goal: ${goal}oz`;
  } else {
    setGoalForm.classList.remove("hide");
    progressSection.classList.add("hide");
    goalH2.classList.add("hide");
    goalH2.textContent = "";
  }
  updateProgressHtml();
};

// event listeners
setGoalForm.addEventListener("submit", (e) => {
  e.preventDefault();
  goal = document.querySelector("#goal").value;
  localStorage.setItem("goal", goal.toString());
  console.log(goal);
  showHideHtml();
});

progressSection.addEventListener("click", (e) => {
  if (e.target.classList.contains("update")) {
    progress += 8;
    localStorage.setItem("progress", progress.toString());
    console.log(progress);
    console.log(getPercent());
    updateProgressHtml();
  }
  if (e.target.classList.contains("reset")) {
    goal = 0;
    progress = 0;
    showHideHtml();
    localStorage.removeItem("goal");
    localStorage.removeItem("progress");
  }
});

// call to run on refresh or page load:
showHideHtml();
