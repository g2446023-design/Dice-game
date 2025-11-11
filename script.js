document.addEventListener('DOMContentLoaded', () => {
    // DOM要素の取得
    const die1Elem = document.getElementById('die1');
    const die2Elem = document.getElementById('die2');
    const die3Elem = document.getElementById('die3');
    const handNameElem = document.getElementById('hand-name');
    const rollButton = document.getElementById('roll-button');

    // Unicodeのサイコロの目
    const diceFaces = ['⚀', '⚁', '⚂', '⚃', '⚄', '⚅']; // 1-6に対応

    // 「サイコロを振る」ボタンの処理
    rollButton.addEventListener('click', () => {
        
        // 1. ボタンを無効化（連打防止）
        rollButton.disabled = true;

        // 2. サイコロの表示を一時的に変更（振っている感を出す）
        die1Elem.textContent = '...';
        die2Elem.textContent = '...';
        die3Elem.textContent = '...';
        handNameElem.textContent = '（振っています...）';

        // 3. 1秒後（1000ミリ秒）に結果を計算・表示
        setTimeout(() => {
            // 1-6のランダムな整数を3つ生成
            const d1 = Math.floor(Math.random() * 6) + 1;
            const d2 = Math.floor(Math.random() * 6) + 1;
            const d3 = Math.floor(Math.random() * 6) + 1;

            // サイコロの目を表示
            die1Elem.textContent = diceFaces[d1 - 1];
            die2Elem.textContent = diceFaces[d2 - 1];
            die3Elem.textContent = diceFaces[d3 - 1];

            // 役を判定
            const result = evaluateHand(d1, d2, d3);

            // 結果（役名のみ）を表示
            handNameElem.textContent = result.name;

            // 4. ボタンを再度有効化
            rollButton.disabled = false;

        }, 1000); // 1秒待機
    });

    /**
     * サイコロの目から役を判定する関数（勝敗判定なし）
     * @param {number} d1 - サイコロ1の目
     * @param {number} d2 - サイコロ2の目
     * @param {number} d3 - サイコロ3の目
     * @returns {object} - { name: 役の名前 }
     */
    function evaluateHand(d1, d2, d3) {
        // 判定しやすいようにソートする
        const dice = [d1, d2, d3].sort((a, b) => a - b);
        const [s1, s2, s3] = dice;

        // 1. ヒフミ (1-2-3)
        if (s1 === 1 && s2 === 2 && s3 === 3) {
            return { name: 'ヒフミ (1-2-3)' };
        }

        // 2. アラシ (ゾロ目)
        if (s1 === s2 && s2 === s3) {
            if (s1 === 1) {
                return { name: 'ピンゾロ (1-1-1)' };
            }
            return { name: `${s1}のアラシ` };
        }

        // 3. シゴロ (4-5-6)
        if (s1 === 4 && s2 === 5 && s3 === 6) {
            return { name: 'シゴロ (4-5-6)' };
        }

        // 4. 通常の目 (ペア)
        if (s1 === s2) {
            return { name: `${s3}の目` };
        }
        if (s2 === s3) {
            return { name: `${s1}の目` };
        }

        // 5. 目なし
        return { name: '目なし' };
    }
});