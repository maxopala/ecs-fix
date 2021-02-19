function waitLoadFrames(frame, callback, count) {
    console.log(`Trying ${count}...`);
    setTimeout(
        () => {
            if (frame.document.body && frame.document.body.innerHTML && frame.document.body.innerHTML.length > 0) {
                console.log(`Works on try ${count}!`);
                callback();
            } else {
                waitLoadFrames(frame, callback, count + 1);
            }
        },
        500
    );
}

$(document).ready(() => {
    for (let i = 0; i < window.frames.length; i++) {
        const frame = window.frames[i];
        waitLoadFrames(frame, () => {
            const root = frame.document;

            $(root.body).ready(() => {
                console.log('Fixing...');
                const btns = $(root).find('[type="button"]');
                btns.each((j, btn) => {
                    if (btn.value.toLowerCase().indexOf('submit') >= 0 || btn.value.toLowerCase().indexOf('next') >= 0) {
                        const newBtn = $(`
                                        <input
                                         id="ecs-fix-btn"
                                         type="button"
                                         value="${btn.value}"
                                         name="ecs-fix-btn"
                                         class="ecs-fix-btn"
                                         onclick="if (validate(this.form)) parent.frames[1].evaluate(this.form);" />
                                    `).get()[0];
                        console.log('newBtn', newBtn);
                        btn.parentNode.appendChild(newBtn);
                        $(btn).remove();
                        console.log('Fixed!');
                    }
                });
            });
        }, 1);
    }
});
