// 初始化对话历史数组
let conversationHistory = [];
let done = true;


function clearHistory() {
    conversationHistory = []
    const chatContainer = document.getElementById("chat");
    chatContainer.innerHTML = ""
    Android.showToast("清空聊天记录");
}

function appendChatBox(message) {
    const chatContainer = document.getElementById("chat");

    var div = document.createElement('div');
    div.className = 'chat-message ' + message.role;
    div.innerHTML = '<div class="content">' + message.content + '</div>';
    chatContainer.appendChild(div);

    chatContainer.scrollTop = chatContainer.scrollHeight;
}
function call() {
    const query_content = document.getElementById('query_content').value;
    if (!done) {
        Android.showToast("正在请求中...");
        return;
    }
    callLLM(query_content);
}

function callLLM(query_content) {
    done=false;

    const apiToken = 'sk-qlxuepablzgtiwyffvhiagmesatdjwagknrqupykrnvmszji';
    const apiUrl = 'https://api.siliconflow.cn/chat/completions';

    // 将用户的新消息添加到对话历史中
    conversationHistory.push({ role: 'user', content: query_content });
    appendChatBox({ role: 'user', content: query_content });

    const requestBody = {
        model: 'deepseek-ai/DeepSeek-V2.5',
        messages: conversationHistory,
        stream: false,
        max_tokens: 256
    };

    // 设置请求的头部
    const headers = {
        'Authorization': `Bearer ${apiToken}`,
        'Content-Type': 'application/json'
    };

    // 发送请求并处理响应
    fetch(apiUrl, {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(requestBody)
    }).then(response => response.json())
        .then(response => {
            console.log(response);

            conversationHistory.push(response.choices[0].message);
            appendChatBox(response.choices[0].message);
            done = true;

        }).catch(error => {
            console.error('Fetch error:', error);
        });
}

function androidReload()
{
    Android.reload();
}