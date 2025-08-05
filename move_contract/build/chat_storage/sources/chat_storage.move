module 0xbce003f32dde6d7da63e49d6bd5e1ad28fcda376a531859ff9f14f3e33a2f4b8::chat_storage {
    use std::vector;
    use std::string;
    use std::signer;

    struct ChatHistory has key {
        messages: vector<string::String>,
    }

    public entry fun init_account(account: &signer) {
        move_to(account, ChatHistory { messages: vector::empty<string::String>() });
    }

    public entry fun save_message(account: &signer, msg: string::String) acquires ChatHistory {
        let history = borrow_global_mut<ChatHistory>(signer::address_of(account));
        vector::push_back(&mut history.messages, msg);
    }

    #[view]
    public fun get_messages(addr: address): vector<string::String> acquires ChatHistory {
        let history = borrow_global<ChatHistory>(addr);
        history.messages
    }
}
