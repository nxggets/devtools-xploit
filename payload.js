document.write(`
    <style>
              .rainbow {
                text-align: center;
                font-size: 32px;
                font-family: monospace;
                letter-spacing: 1px;
            }
            .rainbow_text_animated {
                background: linear-gradient(to right, #6666ff, #0099ff , #00ff00, #ff3399, #6666ff);
                -webkit-background-clip: text;
                background-clip: text;
                color: transparent;
                animation: rainbow_animation 6s ease-in-out infinite;
                background-size: 400% 100%;
            }
            @keyframes rainbow_animation {
                0%,100% { background-position: 0 0; }
                50% { background-position: 100% 0; }
            }
    </style>
    <center><h1 class="rainbow rainbow_text_animated"> Hello github, if you see this you ran the script correctly!</h1><center>
    `)