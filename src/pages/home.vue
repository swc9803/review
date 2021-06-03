<template>
  <div style="background: rgb(250, 250, 250);">
    <div class="form mt-3">
      <img class="mt-5" src="@/assets/review.jpg" alt="리뷰사진" style="float: right; width: 40%">
      <br><br><br><br>
      <div class="ml-5" style="font-size: 14px; display: inline-block">
        <b style="font-size: 40px; color: rgb(63, 111, 170)">Review-Site</b> <br><br>
        <p>모두가 만들어 나가는 Review-Site입니다. <br>
        온갖 것들을 <b class="" style="font-size: 20px">'평가'</b>하는 장소입니다. <br>
        평가 기준은 존재하지 않으며 개인의 만족도만을 나타내는 곳입니다.</p><br><br><br><br><br><br><br><br><br>
      </div>
    </div>
    <hr>
  </div>
  <div class="footer">
    <div class="box" style="display:inline-block">
      <b>Review</b> <br><br>
      <p style="font-size: 57%">음식이나 옷, 화장품 등 모든 것을 리뷰하세요!</p>
      <img src="@/assets/food.jpg" alt="4.5StarRating" style="width: 45%">
    </div>
    <div class="box" style="display:inline-block">
      <b>Evalution</b> <br><br>
      <p style="font-size: 57%">만족하셨거나 불만족한 것들을 평가하세요!</p>
      <img src="@/assets/star.jpg" alt="4.5StarRating" style="width: 45%">
    </div>
    <div class="box" style="display:inline-block">
      <b>No Ads</b> <br><br>
      <p style="font-size: 57%">광고를 받지 않은 솔직한 리뷰만을 작성해주세요!</p>
      <img src="@/assets/XSign.jpg" alt="4.5StarRating" style="width: 25%">
    </div>
  </div>
</template>

<style scoped>
  .form {
    width: 70%;
    margin: 0 auto;
  }
  hr {
    height: 1px;
  }
  .box {
    width: 25%;
    margin : 20px;
    padding : 30px;
    border : 1px solid rgb(212, 201, 201);
    box-shadow: 1px 1px 1px  rgb(212, 201, 201);
    border-radius : 5px;
  }
  .footer {
    width: 80%;
    margin: 0 auto;
    text-align: center;
  }
</style>
