fullNamestudentIDgradeGroup
document.getElementById("asistencia-form").addEventListener("submit", function(event) {
    event.preventDefault();

    let datosJson = []
    let fullName = document.getElementById("nombre").value.trim();
    let studentID = document.getElementById("cuenta").value.trim();
    let gradeGroup = document.getElementById("grado-grupo").value.trim();

    const nameRegex = /^[A-Za-z]+\s[A-Za-z]+\s[A-Za-z]+$/;
    if (!nameRegex.test(fullName)) {
      document.getElementById("errorMsg").textContent = "El nombre completo debe tener al menos un nombre y dos apellidos.";
      return;
    }

    const idRegex = /^\d{8}$/;
    if (!idRegex.test(studentID)) {
      document.getElementById("errorMsg").textContent = "El número de cuenta debe tener exactamente 8 dígitos.";
      return;
    }

    const gradeGroupRegex = /^[1-8][A-K]$/;
    if (!gradeGroupRegex.test(gradeGroup)) {
      document.getElementById("errorMsg").textContent = "El grado y grupo deben tener el formato correcto (ej. 2B).";
      return;
    }

    if (gradeGroup === "7G") {
      document.getElementById("errorMsg").textContent = "No se cuenta la asistencia para el grupo 7G.";
      return;
    }

    var multiplier = 1;
    if (["A", "B", "C"].includes(gradeGroup.charAt(1))) {
      multiplier = 2;
    }
    var grade = parseInt(gradeGroup.charAt(0));
    if (grade >= 4) {
      multiplier = 3;
    }

    function saveInfo(){
        let datos = {
            fullName:  fullName,
            nCuenta: studentID,
            GradoGrupo: gradeGroup,
        }
        datosJson.push(datos);
    }

    function clearForm(){
      fullName.text = "";
      studentID.text = "";
      gradeGroup.text = "";
    }

    var successMsg = "Asistencia registrada correctamente. ";
    if (multiplier > 1) {
      successMsg += "La asistencia cuenta " + multiplier + " veces.";
      saveInfo();
    } else {
      successMsg += "La asistencia cuenta una vez.";
      saveInfo();
    }
    alert(successMsg);
    clearForm();
    document.getElementById("errorMsg").textContent = "";
    console.log(datosJson);
  });

