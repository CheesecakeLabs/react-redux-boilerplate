import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Counter from '../../components/counter';
import * as CounterActions from '../../modules/counter/actions/counter';


const mapStateToProps = (state) => ({
  counter: state.counter,
});


const mapDispatchToProps = (dispatch) =>
  bindActionCreators(CounterActions, dispatch);


export default connect(mapStateToProps, mapDispatchToProps)(Counter);
