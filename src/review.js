document.addEventListener("DOMContentLoaded", function () {
  showReviews();

  // 리뷰 작성 버튼에 이벤트 리스너 추가
  const openReviewModalBtn = document.getElementById("openReviewModalBtn");
  openReviewModalBtn.addEventListener("click", openReviewModal);

  // 모달 닫기 버튼에 이벤트 리스너 추가
  const closeReviewModalBtn = document.getElementById("closeReviewModalBtn");
  closeReviewModalBtn.addEventListener("click", closeReviewModal);

  // 리뷰 작성 폼에 이벤트 리스너 추가
  const addReviewForm = document.getElementById("add-review-form");
  addReviewForm.addEventListener("submit", function (event) {
    event.preventDefault();
    addReview();
  });

  // 리뷰 목록에 이벤트 리스너 추가
  const reviewsContainer = document.getElementById("reviews-list");
  reviewsContainer.addEventListener("click", function (event) {
    const target = event.target;
    const index = target.getAttribute("data-index");

    if (target.classList.contains("edit-button")) {
      editReview(index);
    }

    if (target.classList.contains("delete-button")) {
      deleteReview(index);
    }
  });
});

// 리뷰 추가 함수 DOM객체 받아서 변수에 저장
function addReview() {
  const user = document.getElementById("user").value;
  const password = document.getElementById("password").value;
  const rating = document.getElementById("modal-rating").value;
  const comment = document.getElementById("comment").value;

  // 유효성 검사 필드값, 비밀번호, 평점, 글자수 제한
  if (!user || !password || !rating || !comment) {
    alert("전부 입력해주세효!");
    return;
  }

  if (password.length < 4) {
    alert("비번은 4자리 이상 쓰세효!");
    return;
  }

  if (rating < 1 || rating > 5) {
    alert("평점은 1에서 5 사이만!");
    return;
  }

  if (comment.length >= 500) {
    alert("글자수 최대 500자임!");
    return;
  }

  // 리뷰 객체 생성
  const review = {
    user: user,
    password: password,
    rating: rating,
    comment: comment,
    timestamp: new Date().toISOString()
  };

  // 로컬 스토리지에서 저장된 리뷰 불러오기
  const existingReviews = JSON.parse(localStorage.getItem("reviews")) || []; // JSON형식으로 파싱해야 js 객체로 변환 가능. 그냥 localstorage에서 getItem하게 되면 일반 문자열이라 형식이 안맞음

  // 새 리뷰 추가
  existingReviews.push(review);

  // 로컬 스토리지에 리뷰 저장
  localStorage.setItem("reviews", JSON.stringify(existingReviews));

  // 리뷰 목록 갱신
  showReviews();

  // 리뷰 작성 필드 초기화
  document.getElementById("add-review-form").reset();

  // 모달 닫기
  closeReviewModal();
}

// 리뷰 수정 함수
function editReview(index) {
  const password = prompt("비밀번호를 입력하세요:");
  const existingReviews = JSON.parse(localStorage.getItem("reviews")) || [];

  // 비밀번호 확인
  if (password === existingReviews[index].password) {
    const newuser = prompt("수정할 작성자를 입력하세요 (현재: " + existingReviews[index].user + "):");
    const newRating = prompt("수정할 평점을 입력하세요 (현재: " + existingReviews[index].rating + "):");
    const newComment = prompt("수정할 리뷰를 입력하세요 (현재: " + existingReviews[index].comment + "):");

    // 수정 시 유효성 검사
    if (!newuser || !newRating || !newComment) {
      alert("전부 입력해주세효!");
      return;
    }

    if (isNaN(newRating) || newRating < 1 || newRating > 5) {
      alert("평점은 1에서 5 사이만!");
      return;
    }

    if (newComment.length >= 500) {
      alert("글자수 최대 500자임!");
      return;
    }

    // 수정 시 (편집됨) 표시
    existingReviews[index].user = newuser;
    existingReviews[index].rating = newRating;
    existingReviews[index].comment = newComment;
    existingReviews[index].edited = true;

    // 로컬 스토리지에 리뷰 저장
    localStorage.setItem("reviews", JSON.stringify(existingReviews));

    // 리뷰 목록 갱신
    showReviews();
  } else {
    alert("비밀번호가 틀렸습니다.");
  }
}

// 리뷰 삭제 함수
function deleteReview(index) {
  const password = prompt("비밀번호를 입력하세요:");
  const existingReviews = JSON.parse(localStorage.getItem("reviews")) || [];

  // 비밀번호 확인
  if (password === existingReviews[index].password) {
    existingReviews.splice(index, 1);
    localStorage.setItem("reviews", JSON.stringify(existingReviews));
    showReviews();
  } else {
    alert("비밀번호가 틀렸습니다.");
  }
}

// 누적된 리뷰 표시 함수
function showReviews() {
  const reviewsContainer = document.getElementById("reviews-list");
  reviewsContainer.innerHTML = "";

  // 로컬 스토리지에서 저장된 리뷰 불러오기
  const existingReviews = JSON.parse(localStorage.getItem("reviews")) || [];

  // 각 리뷰를 HTML에 표시
  existingReviews.forEach((review, index) => {
    const reviewElement = document.createElement("div");
    reviewElement.classList.add("review");

    let reviewText = `<strong>${review.user}</strong> 님의 평점: ${review.rating} (${formatTimestamp(
      review.timestamp
    )})<br>`;
    reviewText += `${review.comment}<br>`;

    if (review.edited) {
      reviewText += "(편집됨)<br>";
    }

    reviewText += `<button type="button" onclick="editReview(${index})">수정</button>`;
    reviewText += `<button type="button" onclick="deleteReview(${index})">삭제</button>`;

    reviewElement.innerHTML = reviewText;
    reviewsContainer.appendChild(reviewElement);
  });
}

// 타임스탬프 포맷
function formatTimestamp(timestamp) {
  const options = {
    year: "numeric",
    month: "numeric",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric"
  };
  return new Date(timestamp).toLocaleString();
}

// 모달 열기
function openReviewModal() {
  const modal = document.getElementById("modal");
  const overlay = document.getElementById("modal-overlay");
  modal.style.display = "block";
  overlay.style.display = "block";
}

// 모달 닫기
function closeReviewModal() {
  const modal = document.getElementById("modal");
  const overlay = document.getElementById("modal-overlay");
  modal.style.display = "none";
  overlay.style.display = "none";
}

// 페이지 로드 시 누적된 리뷰 표시
document.addEventListener("DOMContentLoaded", showReviews);
