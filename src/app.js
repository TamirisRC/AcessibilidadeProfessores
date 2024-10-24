const { createApp } = Vue;

createApp({
  data() {
    return {
      professores: [
        {
          nome: 'Adriana Lima',
          cpf: '123.456.789-00',
          id: '1',
          email: 'adriana@fatec.com',
          cargo: 'Professor',
          ativo: true,
        },
      ],
      form: {
        nome: '',
        cpf: '',
        id: '',
        email: '',
        cargo: '',
      },
      showModal: false,
      isEditing: false,
      editIndex: null,
      successMessage: '',
      accessibilityMenuVisible: false,
      isHighContrast: false,
      fontSize: 1, 
    };
  },
  methods: {
    applyCpfMask(event) {
      let value = event.target.value.replace(/\D/g, ''); 
      value = value.replace(/(\d{3})(\d)/, '$1.$2'); 
      value = value.replace(/(\d{3})(\d{1,2})$/, '$1-$2'); 
      this.form.cpf = value;
    },
    showAddModal() {
      this.resetForm();
      this.showModal = true;
      this.isEditing = false;
    },
    editProfessor(index) {
      this.editIndex = index;
      const professor = this.professores[index];
      this.form = { ...professor };
      this.showModal = true;
      this.isEditing = true;
    },
    addProfessor() {
      this.professores.push({ ...this.form, ativo: true });
      this.closeModal();
      this.successMessage = 'Professor adicionado com sucesso!';
    },
    updateProfessor() {
      this.professores[this.editIndex] = {
        ...this.form,
        ativo: this.professores[this.editIndex].ativo,
      };
      this.closeModal();
      this.successMessage = 'Professor editado com sucesso!';
    },
    confirmDelete(index) {
      const professor = this.professores[index];
      professor.ativo = !professor.ativo;
      this.successMessage = professor.ativo
        ? 'Conta reativada com sucesso'
        : 'Conta desativada com sucesso';
    },
    closeModal() {
      this.showModal = false;
      this.resetForm();
    },
    resetForm() {
      this.form = { nome: '', cpf: '', id: '', email: '', cargo: '' };
    },
    toggleAccessibilityMenu() {
      this.accessibilityMenuVisible = !this.accessibilityMenuVisible;
    },
    toggleContrast() {
      this.isHighContrast = !this.isHighContrast;
      document.body.classList.toggle('high-contrast', this.isHighContrast);
    },
    increaseFontSize() {
      this.fontSize += 0.1;
      document.body.style.fontSize = `${this.fontSize}rem`;
    },
    decreaseFontSize() {
      if (this.fontSize > 0.5) {
        this.fontSize -= 0.1;
        document.body.style.fontSize = `${this.fontSize}rem`;
      }
    },
  },
}).mount('#app');