<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Reg extends CI_Controller {


	
	public function get_cities($value='')
	{
		$name= $this->input->get("_name");
		$value = intval($this->input->get("_value"));
		
                $this->load->model("hjue_country_model");
		$ret = array();
	    
		switch ($name) {
		  case 'province':
			$value = intval($value/10000)*10000;
		    $data = $this->hjue_country_model->getList("code>$value and code<".($value+10000)." and code % 100=0" );

		    break;
		  
		  case 'city':
			$value = intval($value/100)*100;
		    $data = $this->hjue_country_model->getList("code>$value and code<".($value+100) );		

		    break;
		
		  default:
		    $data = $this->hjue_country_model->getList("code % 10000 = 0" );		    
			break;
		}
		$ret['0'] = "请选择";
	    foreach($data as $row)
	    {
	      $ret[$row->code] = $row->name;
	    }
	    jsonpcallback($ret);		
	}
}

