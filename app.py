import streamlit as st
import requests
from googletrans import Translator

st.set_page_config(page_title="English Synonym + Bangla Meaning", page_icon=":books:", layout="centered")

st.markdown("""
    <style>
        .main {
            background-color: #1e1e2f;
            color: white;
        }
        .stTextInput > div > div > input {
            background-color: #333;
            color: white;
        }
        .stButton > button {
            background-color: #6c63ff;
            color: white;
            font-weight: bold;
            border-radius: 8px;
            padding: 0.5rem 1rem;
        }
        .stButton > button:hover {
            background-color: #574b90;
        }
    </style>
""", unsafe_allow_html=True)

st.title("🔍 English Synonym + Bangla Meaning")
word = st.text_input("Enter an English Word")

if st.button("Search"):
    if word:
        with st.spinner("Searching..."):
            try:
                syn_res = requests.get(f"https://api.datamuse.com/words?rel_syn={word}")
                synonyms = [w['word'] for w in syn_res.json()][:5]

                if not synonyms:
                    st.warning("No synonyms found.")
                else:
                    translator = Translator()
                    st.subheader("Results:")
                    for syn in synonyms:
                        trans = translator.translate(syn, src="en", dest="bn")
                        st.markdown(f"- **{syn.capitalize()}** → _{trans.text}_")
            except Exception as e:
                st.error("Something went wrong. Please try again later.")
    else:
        st.warning("Please enter a word.")
