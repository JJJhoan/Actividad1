document.addEventListener("DOMContentLoaded", function () {
    const newsContainer = document.getElementById("news-container");
    const form = document.getElementById("contact-form");

    fetch("news.json")
        .then(response => {
            if (!response.ok) throw new Error("Error al cargar las noticias");
            return response.json();
        })
        .then(data => {
            data.forEach(noticia => {
                const col = document.createElement("div");
                col.className = "col-md-6 mb-3";

                const alert = document.createElement("div");
                alert.className = "alert alert-info p-3";
                alert.innerHTML = `
                    <strong>${noticia.titulo}</strong><br>
                    <small>Publicado el: ${formatDate(noticia.fecha)}</small>
                `;
                col.appendChild(alert);
                newsContainer.appendChild(col);
            });
        })
        .catch(err => {
            const col = document.createElement("div");
            col.className = "col-12";
            col.innerHTML = `<div class="alert alert-danger">No se pudieron cargar las noticias.</div>`;
            newsContainer.appendChild(col);
        });

    function formatDate(dateString) {
        const [year, month, day] = dateString.split("-");
        return `${day}/${month}/${year}`;
    }

    form.addEventListener("submit", function (e) {
        e.preventDefault();

        const name = document.getElementById("name").value.trim();
        const email = document.getElementById("email").value.trim();
        const message = document.getElementById("message").value.trim();

        let errores = [];

        if (name === "") errores.push("• Nombre es obligatorio.");
        if (email === "" || !/^\S+@\S+\.\S+$/.test(email)) errores.push("• Correo no válido.");
        if (message.length < 10) errores.push("• El mensaje debe tener al menos 10 caracteres.");

        if (errores.length > 0) {
            alert("Por favor corrija los siguientes errores:\n\n" + errores.join("\n"));
        } else {
            alert(`¡Gracias, ${name}! Tu mensaje ha sido enviado correctamente.`);
            form.reset();
        }
    });
});