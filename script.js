/* =========================================
   DR. DAVI CARVALHO
   SCRIPT.JS
========================================= */


/* =========================================
   HEADER
========================================= */

const header = document.getElementById("header");

function updateHeader() {

    if (window.scrollY > 30) {

        header.classList.add("scrolled");

    } else {

        header.classList.remove("scrolled");

    }

}

window.addEventListener(
    "scroll",
    updateHeader,
    {
        passive: true
    }
);

updateHeader();



/* =========================================
   MENU MOBILE
========================================= */

const menuButton =
    document.getElementById("menuButton");

const mobileMenu =
    document.getElementById("mobileMenu");


function toggleMenu() {

    menuButton.classList.toggle("active");

    mobileMenu.classList.toggle("active");

    document.body.classList.toggle("menu-open");

}


menuButton.addEventListener(
    "click",
    toggleMenu
);



/* Fecha menu ao clicar nos links */

const mobileLinks =
    mobileMenu.querySelectorAll("a");


mobileLinks.forEach(link => {

    link.addEventListener(
        "click",
        () => {

            menuButton.classList.remove(
                "active"
            );

            mobileMenu.classList.remove(
                "active"
            );

            document.body.classList.remove(
                "menu-open"
            );

        }
    );

});



/* =========================================
   DATA MÍNIMA
========================================= */

const dateInput =
    document.getElementById("date");


if (dateInput) {

    const today =
        new Date();

    const year =
        today.getFullYear();

    const month =
        String(
            today.getMonth() + 1
        ).padStart(2, "0");

    const day =
        String(
            today.getDate()
        ).padStart(2, "0");


    dateInput.min =
        `${year}-${month}-${day}`;

}



/* =========================================
   MÁSCARA WHATSAPP
========================================= */

const phoneInput =
    document.getElementById("phone");


if (phoneInput) {

    phoneInput.addEventListener(
        "input",
        function () {

            let value =
                this.value.replace(
                    /\D/g,
                    ""
                );


            value =
                value.substring(
                    0,
                    11
                );


            if (value.length <= 10) {

                value =
                    value.replace(
                        /^(\d{2})(\d)/,
                        "($1) $2"
                    );


                value =
                    value.replace(
                        /(\d{4})(\d)/,
                        "$1-$2"
                    );

            } else {

                value =
                    value.replace(
                        /^(\d{2})(\d)/,
                        "($1) $2"
                    );


                value =
                    value.replace(
                        /(\d{5})(\d)/,
                        "$1-$2"
                    );

            }


            this.value =
                value;

        }
    );

}



/* =========================================
   FORMULÁRIO
   → WHATSAPP
========================================= */

const appointmentForm =
    document.getElementById(
        "appointmentForm"
    );


if (appointmentForm) {

    appointmentForm.addEventListener(
        "submit",
        function (event) {

            event.preventDefault();


            const name =
                document
                    .getElementById("name")
                    .value
                    .trim();


            const phone =
                document
                    .getElementById("phone")
                    .value
                    .trim();


            const date =
                document
                    .getElementById("date")
                    .value;


            const period =
                document
                    .getElementById("period")
                    .value;


            const service =
                document
                    .getElementById("service")
                    .value;


            const message =
                document
                    .getElementById("message")
                    .value
                    .trim();



            if (
                !name ||
                !phone ||
                !date ||
                !period ||
                !service
            ) {

                alert(
                    "Por favor, preencha todos os campos obrigatórios."
                );

                return;

            }



            /* =================================
               FORMATA DATA
            ================================= */

            const selectedDate =
                new Date(
                    date + "T12:00:00"
                );


            const formattedDate =
                selectedDate.toLocaleDateString(
                    "pt-BR",
                    {
                        day: "2-digit",
                        month: "2-digit",
                        year: "numeric"
                    }
                );



            /* =================================
               NÚMERO DO DR. DAVI
            ================================= */

            const whatsappNumber =
                "5594991968644";



            /* =================================
               MENSAGEM
            ================================= */

            let whatsappMessage =
`Olá, Dr. Davi! Tudo bem?

Gostaria de solicitar um atendimento.

*Nome:* ${name}
*WhatsApp:* ${phone}
*Data desejada:* ${formattedDate}
*Período:* ${period}
*Motivo do atendimento:* ${service}`;



            if (message) {

                whatsappMessage +=
`\n*Observação:* ${message}`;

            }



            whatsappMessage +=
`

Gostaria de saber a disponibilidade para essa data.

Aguardo seu retorno. Obrigado(a)!`;



            /* =================================
               CODIFICA MENSAGEM
            ================================= */

            const encodedMessage =
                encodeURIComponent(
                    whatsappMessage
                );



            /* =================================
               WHATSAPP
            ================================= */

            const whatsappURL =
                `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;



            window.open(
                whatsappURL,
                "_blank",
                "noopener,noreferrer"
            );

        }
    );

}



/* =========================================
   ANIMAÇÃO DOS ELEMENTOS
========================================= */

const animatedElements =
    document.querySelectorAll(
        `
        .specialty-card,
        .review-card,
        .intro-content,
        .intro-label,
        .image-feature-content,
        .appointment-copy,
        .appointment-form-container,
        .location-info,
        .map-container
        `
    );


const observer =
    new IntersectionObserver(
        (entries, observerInstance) => {

            entries.forEach(
                entry => {

                    if (
                        entry.isIntersecting
                    ) {

                        entry.target.style.opacity =
                            "1";

                        entry.target.style.transform =
                            "translateY(0)";

                        observerInstance.unobserve(
                            entry.target
                        );

                    }

                }
            );

        },
        {
            threshold: 0.08
        }
    );



animatedElements.forEach(
    element => {

        element.style.opacity =
            "0";

        element.style.transform =
            "translateY(20px)";

        element.style.transition =
            "opacity 0.7s ease, transform 0.7s ease";

        observer.observe(
            element
        );

    }
);



/* =========================================
   REDIMENSIONAMENTO
========================================= */

window.addEventListener(
    "resize",
    () => {

        if (
            window.innerWidth > 800
        ) {

            menuButton.classList.remove(
                "active"
            );

            mobileMenu.classList.remove(
                "active"
            );

            document.body.classList.remove(
                "menu-open"
            );

        }

    }
);