

function login(){
    const userName = document.getElementById("txtUserName").value;
    const password = document.getElementById("txtPassword").value;

    axios({
        method: "POST",
        url:
          "http://movie0706.cybersoft.edu.vn/api/QuanLyPhim/ThemPhim",
        
          data: {
            maPhim: userName,
            tenPhim: password,
            biDanh:
            trailer: ,
            hinhAnh: "",
            moTa: "",
            maNhom: "",
            danhGia: 0
          }
      })
        .then(function(response) {
          console.log(response)
          localStorage.setItem("credentials",JSON.stringify(response.data));
          window.location.assign('index.html');
        })
        .catch(function(error) {
          console.log({...error});
        });
}