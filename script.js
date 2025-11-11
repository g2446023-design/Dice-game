document.addEventListener('DOMContentLoaded', () => {
    // DOM要素の取得
    const die1Elem = document.getElementById('die1');
    const die2Elem = document.getElementById('die2');
    const die3Elem = document.getElementById('die3');
    const handNameElem = document.getElementById('hand-name');
    const rollButton = document.getElementById('roll-button');
    const logListElem = document.getElementById('log-list'); // 履歴リストのUL

    // Unicodeのサイコロの目
    const diceFaces = ['⚀', '⚁', '⚂', '⚃', '⚄', '⚅']; // 1-6に対応

    // 「サイコロを振る」ボタンの処理
    rollButton.addEventListener('click', () => {
        
        rollButton.disabled = true;
        die1Elem.textContent = '...';
        die2Elem.textContent = '...';
        die3Elem.textContent = '...';
        handNameElem.textContent = '（振っています...）';

        setTimeout(() => {
            const d1 = Math.floor(Math.random() * 6) + 1;
            const d2 = Math.floor(Math.random() * 6) + 1;
            const d3 = Math.floor(Math.random() * 6) + 1;

            const face1 = diceFaces[d1 - 1];
            const face2 = diceFaces[d2 - 1];
            const face3 = diceFaces[d3 - 1];

            die1Elem.textContent = face1;
            die2Elem.textContent = face2;
            die3Elem.textContent = face3;

            const result = evaluateHand(d1, d2, d3);
            handNameElem.textContent = result.name;

            // --- 履歴追加処理 ---
            addLog(face1, face2, face3, result.name);
            // ---------------------

            rollButton.disabled = false;

        }, 1000); 
    });

    /**
     * 履歴をリストに追加する関数
     * @param {string} face1 - サイコロ1の絵文字
     * @param {string} face2 - サイコロ2の絵文字
     * @param {string} face3 - サイコロ3の絵文字
     * @param {string} handName - 役の名前
     */
    function addLog(face1, face2, face3, handName) {
        // 1. 新しい <li> 要素を作成
        const newLogItem = document.createElement('li');

        // 2. <li> の中身をHTMLで作成
        // （表示が見やすいように、出目と役名を分けてspanで囲む）
        newLogItem.innerHTML = 
            `<span class="log-dice">${face1} ${face2} ${face3}</span>` +
            `<span class="log-hand">${handName}</span>`;

        // 3. リストの *一番上* に追加 (prepend)
        // (appendだと下に追加される)
        logListElem.prepend(newLogItem);
    }


    /**
     * サイコロの目から役を判定する関数
     */
    function evaluateHand(d1, d2, d3) {
        const dice = [d1, d2, d3].sort((a, b) => a - b);
        const [s1, s2, s3] = dice;

        if (s1 === 1 && s2 === 2 && s3 === 3) {
            return { name: 'ヒフミ (1-2-3)' };
        }
        if (s1 === s2 && s2 === s3) {
            if (s1 === 1) {
                return { name: 'ピンゾロ (1-1-1)' };
            }
            return { name: `${s1}のアラシ` };
        }
        if (s1 === 4 && s2 === 5 && s3 === 6) {
            return { name: 'シゴロ (4-5-6)' };
        }
        if (s1 === s2) {
            return { name: `${s3}の目` };
        }
        if (s2 === s3) {
            return { name: `${s1}の目` };
        }
        return { name: '目なし' };
    }
});
