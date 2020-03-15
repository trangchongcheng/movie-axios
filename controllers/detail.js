function getIDFromUrl(){
   return window.location.search.substr(1,).split("=")[1];
}
function detailMovie() {
    axios({
      menthod: "get",
      url:
        "http://movie0706.cybersoft.edu.vn/api/QuanLyPhim/LayThongTinPhim?MaPhim="+getIDFromUrl(),
      responseType: "stream"
    })
      .then(function(response) {
        showDetailMovie(response.data)
      })
      .catch(function(error) {
        console.log("That bai " + error);
      });
  }
  function showDetailMovie(data){
    var content = "";
    content = content +
      `
      <h1>Chi tiet phim</h1>
      <div class=row>
      <div class="col-3">
      <img class="img-fluid" src="${data.hinhAnh}">
      </div>
      <div class="col-6">
      <h3>Ten phim ${data.tenPhim}</h3>
      <p>Mo ta</b>${data.moTa}</p>
      <iframe src="${data.trailer}"></iframe>
      </div>
      </div>
   `;
  document.getElementById("movieDetail").innerHTML = content;
  }
  detailMovie();