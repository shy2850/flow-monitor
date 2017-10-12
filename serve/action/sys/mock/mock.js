const fs = require('fs')
const path = require('path')
const fileName = path.join(__dirname, '../runtime.log')

let dataSet = {}

// 网卡数目
const NETCARD_SIZE = Math.ceil(Math.random() * 10)
// 线程数目
const THREAD_SIZE = Math.ceil(Math.random() * 10)
// logger数目
const LOGGER_SIZE = Math.ceil(Math.random() * 10)
// 行为数目
const ACTION_SIZE = Math.ceil(Math.random() * 1000)

const ACTION_IDS = '1'.repeat(ACTION_SIZE).split('').map((one, i) => Math.random() * i * 50 | 0)

const random = (n = 1024) => Math.random() * n | 0
const randomPlus = (k, n = 1024) => {
    let base = dataSet[k] || 0
    return dataSet[k] = base + (Math.random() * n | 0)
}
const peek = (k, n) => {
    let base = dataSet[k] || 0
    return dataSet[k] = Math.max(base, n)
}

const render = function render () {
    let lines = []
    for (let i = 0; i < NETCARD_SIZE; i++) {
        let nic_recv_bytes = randomPlus('nic_recv_bytes-' + i, 1024 * 1024)
        let nic_recv_packets = randomPlus('nic_recv_packets-' + i)
        let nic_send_bytes = randomPlus('nic_send_bytes-' + i, 1024 * 1024)
        let nic_send_packets = randomPlus('nic_send_packets-' + i)
        let nic_drop_packets = randomPlus('nic_drop_packets-' + i)
        let nic_error_packets = randomPlus('nic_error_packets-' + i)
        lines.push(`nic: ${nic_recv_bytes} ${nic_recv_packets} ${nic_send_bytes} ${nic_send_packets} ${nic_drop_packets} ${nic_error_packets}`)
    }

    for (let i = 0; i < THREAD_SIZE; i++) {
        let data = []

        let bit_per_second = (Math.random() + 80) * 1024 * 1024
        let packet_per_second = Math.random() * 1000 + 4096
        let drop_bytes = randomPlus('drop_bytes-' + i, 1024 * 1024)
        let drop_packets = randomPlus('drop_packets-' + i)
        let current_packet_buffer_size = random()
        let peek_packet_buffer_size = peek('peek_packet_buffer_size-' + i, current_packet_buffer_size)
        let session_alloc = random()
        let session_free = random()
        let current_session_num = random()
        let peek_session_num = peek('peek_session_num-' + i, current_session_num)
        data = data.concat([
            bit_per_second,
            packet_per_second,
            drop_bytes,
            drop_packets,
            current_packet_buffer_size,
            peek_packet_buffer_size,
            session_alloc,
            session_free,
            current_session_num,
            peek_session_num
        ])

        let tcp_bytes = randomPlus('tcp_bytes-' + i, 1024 * 1024)
        let tcp_packets = randomPlus('tcp_packets-' + i)
        let tcp_session_alloc = random()
        let tcp_session_free = random()
        let current_tcp_session_num = random()
        let peek_tcp_session_num = peek('peek_tcp_session_num-' + i, current_tcp_session_num)
        let tcp_out_of_order_alloc = randomPlus('tcp_out_of_order_alloc-' + i)
        let tcp_out_of_order_free = randomPlus('tcp_out_of_order_free-' + i)
        let current_tcp_out_of_order_num = random()
        let peek_tcp_out_of_order_num = peek('peek_tcp_out_of_order_num-' + i, current_tcp_out_of_order_num)
        data = data.concat([
            tcp_bytes,
            tcp_packets,
            tcp_session_alloc,
            tcp_session_free,
            current_tcp_session_num,
            peek_tcp_session_num,
            tcp_out_of_order_alloc,
            tcp_out_of_order_free,
            current_tcp_out_of_order_num,
            peek_tcp_out_of_order_num
        ])

        let udp_bytes = randomPlus('udp_bytes-' + i, 1024 * 1024)
        let udp_packets = randomPlus('udp_packets-' + i)
        let udp_session_alloc = random()
        let udp_session_free = random()
        let current_udp_session_num = random()
        let peek_udp_session_num = peek('peek_udp_session_num-' + i, current_udp_session_num)
        data = data.concat([
            udp_bytes,
            udp_packets,
            udp_session_alloc,
            udp_session_free,
            current_udp_session_num,
            peek_udp_session_num
        ])

        let icmp_bytes = randomPlus('icmp_bytes-' + i, 1024 * 1024)
        let icmp_packets = randomPlus('icmp_packets-' + i)
        data = data.concat([
            icmp_bytes,
            icmp_packets
        ])

        let http_bytes = randomPlus('http_bytes-' + i, 1024 * 1024)
        let http_packets = randomPlus('http_packets-' + i)
        let http_session_alloc = random()
        let http_session_free = random()
        let current_http_session_num = random()
        let peek_http_session_num = peek('peek_http_session_num-' + i, current_http_session_num)
        data = data.concat([
            http_bytes,
            http_packets,
            http_session_alloc,
            http_session_free,
            current_http_session_num,
            peek_http_session_num
        ])

        let ssl_bytes = randomPlus('ssl_bytes-' + i, 1024 * 1024)
        let ssl_packets = randomPlus('ssl_packets-' + i)
        let ssl_session_alloc = random()
        let ssl_session_free = random()
        let current_ssl_session_num = random()
        let peek_ssl_session_num = peek('peek_ssl_session_num-' + i, current_ssl_session_num)
        data = data.concat([
            ssl_bytes,
            ssl_packets,
            ssl_session_alloc,
            ssl_session_free,
            current_ssl_session_num,
            peek_ssl_session_num
        ])

        let dns_bytes = randomPlus('dns_bytes-' + i, 1024 * 1024)
        let dns_packets = randomPlus('dns_packets-' + i)
        let dns_session_alloc = random()
        let dns_session_free = random()
        let current_dns_session_num = random()
        let peek_dns_session_num = peek('peek_dns_session_num-' + i, current_dns_session_num)
        data = data.concat([
            dns_bytes,
            dns_packets,
            dns_session_alloc,
            dns_session_free,
            current_dns_session_num,
            peek_dns_session_num
        ])

        lines.push('worker: ' + data.join(' '))
    }

    for (let i = 0; i < LOGGER_SIZE; i++) {
        let reconnect_num = randomPlus('reconnect_num', 10)
        let current_message_queue_size = random()
        let peek_message_queue_size = peek('peek_message_queue_size', current_message_queue_size)
        let report_messages = randomPlus('report_messages-' + i)
        let report_bytes = randomPlus('report_bytes-' + i, 1024 * 1024)
        let drop_messages = randomPlus('drop_messages-' + i)
        let drop_bytes = randomPlus('drop_bytes-' + i, 1024 * 1024)
        lines.push(`logger: ${reconnect_num} ${current_message_queue_size} ${peek_message_queue_size} ${report_messages} ${report_bytes} ${drop_messages} ${drop_bytes}`)
    }

    for (let i = 0; i < ACTION_SIZE; i++) {
        let report_messages = randomPlus('report_messages-' + i)
        let report_bytes = randomPlus('report_bytes-' + i, 1024 * 1024)
        let drop_messages = randomPlus('drop_messages-' + i)
        let drop_bytes = randomPlus('drop_bytes-' + i, 1024 * 1024)
        lines.push(`act: ${ACTION_IDS[i]} ${report_messages} ${report_bytes} ${drop_messages} ${drop_bytes}`)
    }
    
    let sum_peek_packet_buffer_size = peek('sum_peek_packet_buffer_size', random(1024 * THREAD_SIZE))
    let sum_peek_session_num = peek('sum_peek_session_num', random(1024 * THREAD_SIZE))
    let sum_peek_tcp_session_num = peek('sum_peek_tcp_session_num', random(1024 * THREAD_SIZE))
    let sum_peek_tcp_out_of_order_num = peek('sum_peek_tcp_out_of_order_num', random(1024 * THREAD_SIZE))
    let sum_peek_udp_session_num = peek('sum_peek_udp_session_num', random(1024 * THREAD_SIZE))
    let sum_peek_http_session_num = peek('sum_peek_http_session_num', random(1024 * THREAD_SIZE))
    let sum_peek_ssl_session_num = peek('sum_peek_ssl_session_num', random(1024 * THREAD_SIZE))
    let sum_peek_dns_session_num = peek('sum_peek_dns_session_num', random(1024 * THREAD_SIZE))
    let sum_peek_message_queue_size = peek('sum_peek_message_queue_size', random(1024 * LOGGER_SIZE))
    lines.push(`top: ${sum_peek_packet_buffer_size} ${sum_peek_session_num} ${sum_peek_tcp_session_num} ${sum_peek_tcp_out_of_order_num} ${sum_peek_udp_session_num} ${sum_peek_http_session_num} ${sum_peek_ssl_session_num} ${sum_peek_dns_session_num} ${sum_peek_message_queue_size}`) 
    fs.writeFile(fileName, lines.join('\n'), function () {
        setTimeout(render, 1000)
    })
}

render()