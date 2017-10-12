const MAX_RUNTIME = 60
const REG = /[\d\.]+/g
const toHex = (n) => `${n}`.replace(/(\.\d{3})\d+$/, '$1').replace(/(\d)(?=(?:\d{3})+(\.|$))/g, '$1,')

let result
let current = {
    current_packet_buffer_size: [],
    current_session_num: [],
    current_tcp_session_num: [],
    current_tcp_out_of_order_num: [],
    current_udp_session_num: [],
    current_http_session_num: [],
    current_ssl_session_num: [],
    current_dns_session_num: [],
    current_message_queue_size: [],
    
    recv_bytes: [],
    recv_packets: [],
    send_bytes: [],
    send_packets: []
}
const renderCurrent = (key, value, index) => {
    let cr = current[key][index]
    if (cr) {
        current[key][index] = [value].concat(cr).slice(0, MAX_RUNTIME)
    } else {
        current[key][index] = [value]
    }
}
const exec = {
    nic: (v, i) => {
        const [
            recv_bytes,
            recv_packets,
            send_bytes,
            send_packets,
            drop_packets,
            error_packets
        ] = v.match(REG).map(Number)
        renderCurrent('recv_bytes', recv_bytes / 1024 / 1024, i)
        renderCurrent('recv_packets', recv_packets / 1024, i)
        renderCurrent('send_bytes', send_bytes / 1024 / 1024, i)
        renderCurrent('send_packets', send_packets / 1024, i)
        result.nic.push({
            recv_bytes,
            recv_packets,
            send_bytes,
            send_packets,
            drop_packets,
            error_packets
        })
    },
    worker: (v, i) => {
        const [
            bit_per_second,
            packet_per_second,
            drop_bytes,
            drop_packets,
            current_packet_buffer_size,
            peek_packet_buffer_size,
            session_alloc,
            session_free,
            current_session_num,
            peek_session_num,

            tcp_bytes,
            tcp_packets,
            tcp_session_alloc,
            tcp_session_free,
            current_tcp_session_num,
            peek_tcp_session_num,
            tcp_out_of_order_alloc,
            tcp_out_of_order_free,
            current_tcp_out_of_order_num,
            peek_tcp_out_of_order_num,

            udp_bytes,
            udp_packets,
            udp_session_alloc,
            udp_session_free,
            current_udp_session_num,
            peek_udp_session_num,

            icmp_bytes,
            icmp_packets,

            http_bytes,
            http_packets,
            http_session_alloc,
            http_session_free,
            current_http_session_num,
            peek_http_session_num,

            ssl_bytes,
            ssl_packets,
            ssl_session_alloc,
            ssl_session_free,
            current_ssl_session_num,
            peek_ssl_session_num,

            dns_bytes,
            dns_packets,
            dns_session_alloc,
            dns_session_free,
            current_dns_session_num,
            peek_dns_session_num
        ] = v.match(REG).map(Number)
        renderCurrent('current_packet_buffer_size', current_packet_buffer_size, i)
        renderCurrent('current_session_num', current_session_num, i)
        renderCurrent('current_tcp_session_num', current_tcp_session_num, i)
        renderCurrent('current_tcp_out_of_order_num', current_tcp_out_of_order_num, i)
        renderCurrent('current_udp_session_num', current_udp_session_num, i)
        renderCurrent('current_http_session_num', current_http_session_num, i)
        renderCurrent('current_ssl_session_num', current_ssl_session_num, i)
        renderCurrent('current_dns_session_num', current_dns_session_num, i)
        result.worker.push({
            bit_per_second,
            packet_per_second,
            drop_bytes,
            drop_packets,
            current_packet_buffer_size,
            peek_packet_buffer_size,
            session_alloc,
            session_free,
            current_session_num,
            peek_session_num,

            tcp_bytes,
            tcp_packets,
            tcp_session_alloc,
            tcp_session_free,
            current_tcp_session_num,
            peek_tcp_session_num,
            tcp_out_of_order_alloc,
            tcp_out_of_order_free,
            current_tcp_out_of_order_num,
            peek_tcp_out_of_order_num,

            udp_bytes,
            udp_packets,
            udp_session_alloc,
            udp_session_free,
            current_udp_session_num,
            peek_udp_session_num,

            icmp_bytes,
            icmp_packets,

            http_bytes,
            http_packets,
            http_session_alloc,
            http_session_free,
            current_http_session_num,
            peek_http_session_num,

            ssl_bytes,
            ssl_packets,
            ssl_session_alloc,
            ssl_session_free,
            current_ssl_session_num,
            peek_ssl_session_num,

            dns_bytes,
            dns_packets,
            dns_session_alloc,
            dns_session_free,
            current_dns_session_num,
            peek_dns_session_num
        })
    },
    logger: (v, i) => {
        const [
            reconnect_num,
            current_message_queue_size,
            peek_message_queue_size,
            report_messages,
            report_bytes,
            drop_messages,
            drop_bytes
        ] = v.match(REG).map(Number)
        renderCurrent('current_message_queue_size', current_message_queue_size, i)
        result.logger.push({
            reconnect_num,
            current_message_queue_size,
            peek_message_queue_size,
            report_messages,
            report_bytes,
            drop_messages,
            drop_bytes
        })
    },
    act: v => {
        const [
            id,
            report_messages,
            report_bytes,
            drop_messages,
            drop_bytes
        ] = v.match(REG).map(Number)
        const appId = id / 500 | 0
        const action = {
            id,
            report_messages,
            report_bytes,
            drop_messages,
            drop_bytes
        }
        let app = result.app.find(({id}) => id === appId)
        if (!app) {
            result.app.push({
                id: appId,
                actions: [
                    action
                ]
            })
        } else {
            app.actions.push(action)
        }
        result.act.push(action)
    },
    top: v => {
        const [
            peek_packet_buffer_size,
            peek_session_num,
            peek_tcp_session_num,
            peek_tcp_out_of_order_num,
            peek_udp_session_num,
            peek_http_session_num,
            peek_ssl_session_num,
            peek_dns_session_num,
            peek_message_queue_size
        ] = v.match(REG).map(Number)
        result.top = {
            peek_packet_buffer_size,
            peek_session_num,
            peek_tcp_session_num,
            peek_tcp_out_of_order_num,
            peek_udp_session_num,
            peek_http_session_num,
            peek_ssl_session_num,
            peek_dns_session_num,
            peek_message_queue_size
        }
    }
}
new EventSource('/sys.runtime').onmessage = function (e) {
    const { data } = e
    const list = JSON.parse(data)

    result = {
        nic: [],
        worker: [],
        logger: [],
        act: [],
        app: [],
        top: {},
        current
    }

    let indexes = {
        nic: 0,
        worker: 0,
        logger: 0,
        act: 0,
        top: 0
    }
    list.map((line) => {
        const [key, v] = line.split(/\:\s*/)
        exec[key] && exec[key](v, indexes[key]++)
    })
    postMessage(result)
}