const accessToken = JSON.parse(localStorage.getItem("credentials")).accessToken;
var arrMovie = [];
function getDatFromDB() {
  axios({
    method: "GET",
    url:
      "http://movie0706.cybersoft.edu.vn/api/QuanLyPhim/LayDanhSachPhim?maNhom=GP01",
    responseType: "stream"
  })
    .then(function(response) {
      console.log(response.data);
      arrMovie = response.data;
      getMovieByPage(0);
    })
    .catch(function(error) {
      console.log("That bai " + error);
    });
}

getDatFromDB();

function showMovies(arr) {
  var content = "";
  for (let index = 0; index < arr.length; index++) {
    var mo = arr[index];
    content =
      content +
      `  <div class="col-3">
       <div  class="card p-2 mb-3">
       <img class="img-fluid" src="${mo.hinhAnh}">
       <h5>Tên phim:${mo.tenPhim}</h5>
       <p>Đánh giá:
        ${numberStar(mo.danhGia)}
     </p>
     <p>Ngày chiếu:${mo.ngayKhoiChieu}</p>
     <a href="detail.html?id=${mo.maPhim}" class="btn btn-success">Chi tiết</a>
    <button type="button" class="btn btn-danger mt-2" onclick="deleteMovie(${
      mo.maPhim
    })">Xóa</button>
    </div>
   </div>
   </div>
   `;
  }
  document.getElementById("movieListContent").innerHTML = content;
  getPageNumber();
}

function numberStar(numStar) {
  if (numStar > 5) numStar = 5;
  var contentStar = "";
  for (let index = 0; index < numStar; index++) {
    contentStar = contentStar + `<i class="fa fa-star text-warning mr-1"></i>`;
  }
  for (let index = 0; index < 5 - numStar; index++) {
    contentStar = contentStar + `<i class="far fa-star text-warning mr-1"></i>`;
  }
  return contentStar;
}

function getPageNumber() {
  if (arrMovie != undefined) {
    var content = "";
    const pageNumber = Math.round(arrMovie.length / 4);

    for (let i = 0; i < pageNumber; i++) {
      content =
        content +
        `
        <li id ="page${i}" class="page-item" onclick="getMovieByPage(${i})"><a class="page-link" href="#">${+i}</a></li>
  
        `;
    }
  }
  document.getElementById("pageNumber").innerHTML = content;
}
function getMovieByPage(page) {
  var star = page * 4;
  var end = star + 4;
  var arrMoviebyPage = arrMovie.slice(star, end);
  showMovies(arrMoviebyPage);
  document.getElementById("page" + page).classList.add("active");
}

function deleteMovie(id) {
  axios({
    method: "delete",
    url:
      "http://movie0706.cybersoft.edu.vn/api/QuanLyPhim/XoaPhim?MaPhim=" + id,
    headers: { Authorization: `Bearer ${accessToken}` }
  })
    .then(res => {
      console.log(res.data);
      getDatFromDB();
    })
    .catch((...error) => {
      console.log(...error);
    });
}
